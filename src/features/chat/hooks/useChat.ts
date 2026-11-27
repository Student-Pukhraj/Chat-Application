import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { mockMessages } from '../services/mockMessages'

async function fetchMockMessages(conversationId: string) {
  await Promise.resolve()
  return mockMessages.filter((message) => message.conversationId === conversationId)
}

export function useChat(conversationId: string) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMockMessages(conversationId),
  })
}

export function useSendMessage(conversationId: string) {
  return useMemo(() => ({ conversationId }), [conversationId])
}
