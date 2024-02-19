import { writable } from 'svelte/store'

function createAccessTokenStore() {
  const { subscribe, set } = writable(localStorage.getItem('accessToken') || '')

  return {
    subscribe,
    set: (value: string) => {
      set(value)
      localStorage.setItem('accessToken', value)
    },
    reset: () => {
      set('')
      localStorage.removeItem('accessToken')
    },
  }
}

export let accessToken = createAccessTokenStore()

export let user = writable<User>()
