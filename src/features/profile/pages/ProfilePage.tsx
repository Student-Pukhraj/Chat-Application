import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../../components/ui/Avatar'

export function ProfilePage() {
  return <main className="min-h-screen bg-canvas p-4 sm:p-8"><section className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-6"><Link to="/chat" className="mb-5 inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft className="h-4 w-4" />Back to chat</Link><div className="flex items-center gap-4"><Avatar initials="AM" color="bg-brand" size="lg" online /><div><h1 className="text-xl font-semibold">Alex Morgan</h1><p className="text-sm text-muted">alex@company.com</p></div></div><dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6"><div><dt className="text-xs text-muted">Department</dt><dd className="mt-1 text-sm font-medium">Product Design</dd></div><div><dt className="text-xs text-muted">Status</dt><dd className="mt-1 text-sm font-medium">Available</dd></div></dl></section></main>
}
