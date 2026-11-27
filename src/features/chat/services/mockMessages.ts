import type { ChatMessage } from '../types/message'

export const mockMessages: ChatMessage[] = [
  { id: 'm1', conversationId: 'design', sender: 'other', senderName: 'Maya Chen', text: 'Morning! I’ve uploaded the updated dashboard screens.', timestamp: '10:31 AM' },
  { id: 'm2', conversationId: 'design', sender: 'me', senderName: 'You', text: 'Perfect. The new conversation list feels much clearer.', timestamp: '10:34 AM', status: 'read' },
  { id: 'm3', conversationId: 'design', sender: 'other', senderName: 'Maya Chen', text: 'Great! I also tightened the spacing on mobile. Could you take a look before standup?', timestamp: '10:38 AM' },
  { id: 'm4', conversationId: 'design', sender: 'me', senderName: 'You', text: 'Absolutely — I’ll add a few notes in the handoff after I review them.', timestamp: '10:42 AM', status: 'delivered' },
]
