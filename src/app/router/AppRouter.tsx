import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../../features/auth/pages/AuthPage'
import { ChatPage } from '../../features/chat/pages/ChatPage'
import { ContactsPage } from '../../features/contacts/pages/ContactsPage'
import { ProfilePage } from '../../features/profile/pages/ProfilePage'
import { NotificationsPage } from '../../features/notifications/pages/NotificationsPage'
import { SettingsPage } from '../../features/settings/pages/SettingsPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage registration />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/chat/:conversationId" element={<ChatPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  )
}
