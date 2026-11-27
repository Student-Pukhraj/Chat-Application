import axios from 'axios'
import { apiConfig } from './api-config'

export const apiClient = axios.create({
  baseURL: apiConfig.gatewayUrl,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
)
