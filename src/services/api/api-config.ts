export const apiConfig = {
  mode: import.meta.env.VITE_API_MODE ?? 'mock',
  gatewayUrl: import.meta.env.VITE_API_GATEWAY_URL ?? '/api',
  serviceUrls: {
    auth: import.meta.env.VITE_AUTH_SERVICE_URL,
    user: import.meta.env.VITE_USER_SERVICE_URL,
    conversation: import.meta.env.VITE_CONVERSATION_SERVICE_URL,
    message: import.meta.env.VITE_MESSAGE_SERVICE_URL,
    notification: import.meta.env.VITE_NOTIFICATION_SERVICE_URL,
  },
}
