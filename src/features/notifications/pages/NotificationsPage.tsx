import { ArrowLeft, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotificationsPage() {
  return (
    <main className="min-h-screen bg-canvas p-4 sm:p-8">
      <section className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-5">
        <Link
          to="/chat"
          className="mb-5 inline-flex items-center gap-2 text-sm text-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to chat
        </Link>
        <h1 className="mb-5 text-xl font-semibold">Notifications</h1>
        <div className="flex gap-3 rounded-lg bg-elevated p-4">
          <Bell className="h-5 w-5 text-brand" />
          <div>
            <p className="text-sm font-medium">
              Maya mentioned you in Design team
            </p>
            <p className="mt-1 text-xs text-muted">10 minutes ago</p>
          </div>
        </div>
      </section>
    </main>
  )
}
