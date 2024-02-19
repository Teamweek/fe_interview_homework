<script lang="ts">
  import { onMount } from 'svelte'
  import Timeline from './lib/Timeline.svelte'
  import { accessToken, user } from './lib/stores/auth'
  import { api } from './api'
  import type { AuthenticateTokenRequest, AuthenticateTokenResponse, MeResponse } from './lib/types/network'
  import { AUTH_REDIRECT_URI, TOGGL_PLAN_BASE_URL } from './url'
  import type { AxiosResponse } from 'axios'

  let isLoading = true
  let isLogged = false

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code && !$accessToken) {
      const encodedToken = btoa(
        `${import.meta.env.VITE_TOGGL_PLAN_CLIENT_ID}:${import.meta.env.VITE_TOGGL_PLAN_SECRET_ID}`,
      )

      const tokenResult = await api.post<
        AuthenticateTokenResponse,
        AxiosResponse<AuthenticateTokenResponse>,
        AuthenticateTokenRequest
      >(
        'authenticate/token',
        {
          code,
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_TOGGL_PLAN_CLIENT_ID,
        },
        {
          headers: {
            Authorization: `Basic ${encodedToken}`,
          },
        },
      )

      accessToken.set(tokenResult.data.access_token)
    }

    if ($accessToken) {
      const userResult = await api.get<MeResponse>('me')
      user.set(userResult.data)
    }

    isLoading = false
    isLogged = !!$accessToken
  })
</script>

{#if isLoading}
  Loading...
{:else if !isLogged}
  <!-- TODO(michell): implement Button component -->
  <div class="m-2">
    <p>Sign in to continue</p>
    <a
      href={`${TOGGL_PLAN_BASE_URL}/oauth/login?response_type=code&client_id=${import.meta.env.VITE_TOGGL_PLAN_CLIENT_ID}&redirect_uri=${encodeURIComponent(AUTH_REDIRECT_URI)}`}
      class="inline-block rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Login
    </a>
  </div>
{:else}
  <div class="m-2 flex items-center gap-2">
    <img src={$user.picture_url} alt={$user.name} class="rounded-full" />
    <p>Welcome, {$user.name}</p>
  </div>
  <Timeline />
{/if}
