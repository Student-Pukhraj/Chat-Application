import { ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../../components/ui/Avatar'

const contacts = [
  ['Maya Chen', 'MC', 'bg-amber-500', 'maya@company.com'],
  ['Sam Wilson', 'SW', 'bg-emerald-500', 'sam@company.com'],
  ['Olivia Martin', 'OM', 'bg-pink-500', 'olivia@company.com'],
]

export function ContactsPage() {
  return <main className="min-h-screen bg-canvas p-4 sm:p-8"><section className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-5"><div className="mb-6 flex items-center gap-3"><Link to="/chat" aria-label="Back to chat" className="grid h-9 w-9 place-items-center rounded-full hover:bg-elevated"><ArrowLeft className="h-5 w-5" /></Link><h1 className="text-xl font-semibold">Contacts</h1></div><label className="relative block"><Search className="absolute left-3 top-3 h-4 w-4 text-muted" /><input placeholder="Search people" className="h-10 w-full rounded-lg border border-border bg-elevated pl-9 pr-3 text-sm outline-none focus:border-brand" /></label><div className="mt-4 divide-y divide-border">{contacts.map(([name, initials, color, email]) => <div key={email} className="flex items-center gap-3 py-4"><Avatar initials={initials} color={color} /><div><p className="font-medium">{name}</p><p className="text-sm text-muted">{email}</p></div></div>)}</div></section></main>
}
