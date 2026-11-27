export type ChatMessage = {
  id: string
  conversationId: string
  sender: 'me' | 'other'
  senderName: string
  text: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
}
