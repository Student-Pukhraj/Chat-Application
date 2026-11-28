import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Bell, ContactRound, Home, Menu, MoreVertical, Paperclip, Phone, Search, Send, Settings, ShieldCheck, Smile, Video, X } from 'lucide-react'
import { Avatar } from '../../../components/ui/Avatar'
import { EmptyState, LoadingState } from '../../../components/shared/States'
import { mockConversations } from '../../conversations/services/mockConversations'
import { useChat } from '../hooks/useChat'
import type { ChatMessage } from '../types/message'

export function ChatPage() {
  const params = useParams()
  const [selectedId, setSelectedId] = useState(params.conversationId ?? 'design')
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [mobileList, setMobileList] = useState(false)
  const { data, isLoading, isError } = useChat(selectedId)

  const conversation = mockConversations.find((item) => item.id === selectedId) ?? mockConversations[0]
  const visibleMessages = [...(data ?? []), ...messages.filter((message) => message.conversationId === selectedId)]
  const normalizedQuery = query.toLowerCase()
  const filtered = mockConversations.filter((item) => item.name.toLowerCase().includes(normalizedQuery) || item.lastMessage.toLowerCase().includes(normalizedQuery))
  let conversationStatus = 'Last seen recently'
  if (conversation.isRoom) conversationStatus = 'Room · 12 members'
  else if (conversation.online) conversationStatus = 'Active now'

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [...current, { id: `local-${Date.now()}`, conversationId: selectedId, sender: 'me', senderName: 'You', text, timestamp: 'Now', status: 'sent' }])
    setDraft('')
  }

  const selectConversation = (id: string) => {
    setSelectedId(id)
    setMobileList(false)
  }

  return (
    <main className="h-screen overflow-hidden bg-canvas text-ink">
      <div className="mx-auto flex h-full max-w-[1600px] gap-0 bg-surface shadow-panel lg:m-3 lg:h-[calc(100vh-24px)] lg:rounded-xl lg:border lg:border-border">
        <aside className="hidden w-16 shrink-0 flex-col items-center border-r border-border bg-elevated py-3 md:flex">
          <div className="mb-5 grid h-9 w-9 place-items-center rounded-lg bg-brand text-sm font-bold text-brand-foreground">GC</div>
          <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Primary navigation">
            <NavLink to="/chat" className={({ isActive }) => `grid h-10 w-10 place-items-center rounded-lg ${isActive ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-surface'}`}><Home className="h-5 w-5" /></NavLink>
            <NavLink to="/contacts" className={({ isActive }) => `grid h-10 w-10 place-items-center rounded-lg ${isActive ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-surface'}`}><ContactRound className="h-5 w-5" /></NavLink>
            <NavLink to="/notifications" className={({ isActive }) => `grid h-10 w-10 place-items-center rounded-lg ${isActive ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-surface'}`}><Bell className="h-5 w-5" /></NavLink>
            <NavLink to="/admin" aria-label="Admin dashboard" className={({ isActive }) => `grid h-10 w-10 place-items-center rounded-lg ${isActive ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-surface'}`}><ShieldCheck className="h-5 w-5" /></NavLink>
          </nav>
          <NavLink to="/settings" aria-label="Settings" className={({ isActive }) => `grid h-10 w-10 place-items-center rounded-lg ${isActive ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-surface'}`}><Settings className="h-5 w-5" /></NavLink>
        </aside>

        <aside className={`${mobileList ? 'flex' : 'hidden'} absolute inset-0 z-30 w-full flex-col border-r border-border bg-surface md:relative md:flex md:w-[310px] lg:w-[340px]`}>
          <header className="flex h-[72px] items-center justify-between px-4">
            <div><h1 className="text-xl font-semibold">Chat</h1><p className="text-xs text-muted">Google Chat workspace</p></div>
            <button type="button" onClick={() => setMobileList(false)} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-elevated md:hidden" aria-label="Close conversations"><X className="h-5 w-5" /></button>
          </header>
          <div className="px-3 pb-3"><label className="relative block"><Search className="absolute left-3 top-3 h-4 w-4 text-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations" className="h-10 w-full rounded-full border border-border bg-elevated pl-9 pr-3 text-sm outline-none focus:border-brand" /></label></div>
          <div className="flex-1 overflow-y-auto px-2 pb-3">
            {filtered.length === 0 ? <EmptyState title="No conversations" description="Try another search term." /> : filtered.map((item) => (
              <button type="button" key={item.id} onClick={() => selectConversation(item.id)} className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left ${item.id === selectedId ? 'bg-brand/10' : 'hover:bg-elevated'}`}>
                <Avatar initials={item.initials} color={item.avatarColor} online={item.online} />
                <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-sm font-semibold">{item.name}</p><span className="shrink-0 text-[11px] text-muted">{item.timestamp}</span></div><div className="mt-0.5 flex items-center justify-between gap-2"><p className="truncate text-xs text-muted">{item.lastMessage}</p>{item.unreadCount > 0 ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] text-brand-foreground">{item.unreadCount}</span> : null}</div></div>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[72px] shrink-0 items-center border-b border-border px-3 sm:px-5">
            <button type="button" onClick={() => setMobileList(true)} className="mr-2 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-elevated md:hidden" aria-label="Open conversations"><Menu className="h-5 w-5" /></button>
            <Avatar initials={conversation.initials} color={conversation.avatarColor} online={conversation.online} />
            <div className="ml-3 min-w-0"><h2 className="truncate text-sm font-semibold sm:text-base">{conversation.name}</h2><p className="text-xs text-muted">{conversationStatus}</p></div>
            <div className="ml-auto flex items-center gap-1 text-muted"><button type="button" aria-label="Start video call" className="hidden h-9 w-9 place-items-center rounded-full hover:bg-elevated sm:grid"><Video className="h-4 w-4" /></button><button type="button" aria-label="Start voice call" className="hidden h-9 w-9 place-items-center rounded-full hover:bg-elevated sm:grid"><Phone className="h-4 w-4" /></button><button type="button" aria-label="Conversation details" className="grid h-9 w-9 place-items-center rounded-full hover:bg-elevated"><MoreVertical className="h-4 w-4" /></button></div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-8">
            {isLoading ? <LoadingState label="Loading messages" /> : null}
            {isError ? <EmptyState title="Messages unavailable" description="This conversation could not be loaded." /> : null}
            {!isLoading && !isError ? <div className="mx-auto max-w-3xl space-y-5">{visibleMessages.length === 0 ? <EmptyState title="No messages yet" description="Start the conversation by sending a message." /> : visibleMessages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] sm:max-w-[70%] ${message.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                  {message.sender === 'other' ? <span className="mb-1 px-1 text-xs font-medium text-muted">{message.senderName}</span> : null}
                  <div className={`rounded-2xl px-4 py-2.5 text-sm leading-6 ${message.sender === 'me' ? 'rounded-br-md bg-brand text-brand-foreground' : 'rounded-bl-md bg-elevated text-ink'}`}>{message.text}</div>
                  <span className="mt-1 px-1 text-[10px] text-muted">{message.timestamp}{message.status ? ` · ${message.status}` : ''}</span>
                </div>
              </div>
            ))}</div> : null}
          </div>

          <footer className="shrink-0 p-3 sm:px-5 sm:pb-5">
            <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-elevated p-2 focus-within:border-brand">
              <button type="button" aria-label="Attach file" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted hover:bg-surface"><Paperclip className="h-4 w-4" /></button>
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage() } }} rows={1} placeholder="Message" className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none" />
              <button type="button" aria-label="Add emoji" className="hidden h-9 w-9 shrink-0 place-items-center rounded-full text-muted hover:bg-surface sm:grid"><Smile className="h-4 w-4" /></button>
              <button type="button" onClick={sendMessage} disabled={!draft.trim()} aria-label="Send message" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground disabled:opacity-40"><Send className="h-4 w-4" /></button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  )
}
