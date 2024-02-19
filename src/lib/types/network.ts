export type AuthenticateTokenRequest = {
  code: string
  grant_type: 'authorization_code'
  client_id: string
}

export type AuthenticateTokenResponse = {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

export type MeResponse = User
