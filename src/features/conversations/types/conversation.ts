export type Conversation = {
  id: string
  name: string
  initials: string
  avatarColor: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  online?: boolean
  isRoom?: boolean
}
