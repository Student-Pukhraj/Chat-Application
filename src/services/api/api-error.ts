import axios from 'axios'

export type ApiError = { message: string; status?: number }

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    let responseMessage: string | undefined
    if (error.response?.data && typeof error.response.data === 'object') {
      const data = error.response.data as Record<string, unknown>
      if (typeof data.message === 'string') responseMessage = data.message
    }
    return { message: responseMessage ?? error.message, status }
  }
  return { message: error instanceof Error ? error.message : 'An unexpected error occurred' }
}
