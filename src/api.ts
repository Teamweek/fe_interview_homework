import axios from 'axios'

export const api = axios.create({
  baseURL: `https://api.plan.toggl.space/api/v6-rc1`,
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!config.headers.Authorization) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return config
})
