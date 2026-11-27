import type { Conversation } from '../types/conversation'

export const mockConversations: Conversation[] = [
  { id: 'design', name: 'Design team', initials: 'DT', avatarColor: 'bg-violet-500', lastMessage: 'Maya: The latest screens are ready', timestamp: '10:42 AM', unreadCount: 4, isRoom: true },
  { id: 'maya', name: 'Maya Chen', initials: 'MC', avatarColor: 'bg-amber-500', lastMessage: 'Thanks! I’ll review it today.', timestamp: '9:18 AM', unreadCount: 1, online: true },
  { id: 'sam', name: 'Sam Wilson', initials: 'SW', avatarColor: 'bg-emerald-500', lastMessage: 'You: Shared the project timeline', timestamp: 'Yesterday', unreadCount: 0, online: true },
  { id: 'engineering', name: 'Engineering', initials: 'EN', avatarColor: 'bg-blue-500', lastMessage: 'Alex: Sprint planning at 2 PM', timestamp: 'Yesterday', unreadCount: 0, isRoom: true },
  { id: 'olivia', name: 'Olivia Martin', initials: 'OM', avatarColor: 'bg-pink-500', lastMessage: 'See you on Monday!', timestamp: 'Mon', unreadCount: 0, online: false },
]
