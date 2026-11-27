export interface RealtimeClient {
  connect(): Promise<void>
  disconnect(): Promise<void>
  subscribe(event: 'message' | 'typing' | 'presence' | 'receipt', listener: (payload: unknown) => void): () => void
}
