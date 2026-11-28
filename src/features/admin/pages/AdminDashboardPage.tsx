import { useMemo, useState } from 'react'
import { ArrowLeft, Building2, ChevronDown, CircleDollarSign, MoreHorizontal, Search, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

type TenantStatus = 'Active' | 'Suspended' | 'Trial'
type Tenant = Readonly<{ id: string; name: string; slug: string; members: number; plan: 'Free' | 'Starter' | 'Business' | 'Enterprise'; status: TenantStatus; usage: number }>

const initialTenants: readonly Tenant[] = [
  { id: 'tenant_acme', name: 'Acme Technologies', slug: 'acme', members: 48, plan: 'Business', status: 'Active', usage: 68 },
  { id: 'tenant_northstar', name: 'Northstar Labs', slug: 'northstar', members: 23, plan: 'Starter', status: 'Trial', usage: 41 },
  { id: 'tenant_orbit', name: 'Orbit Systems', slug: 'orbit', members: 156, plan: 'Enterprise', status: 'Active', usage: 82 },
  { id: 'tenant_pixel', name: 'Pixel Works', slug: 'pixel', members: 8, plan: 'Free', status: 'Suspended', usage: 100 },
  { id: 'tenant_vertex', name: 'Vertex Group', slug: 'vertex', members: 64, plan: 'Business', status: 'Active', usage: 57 },
]

const statusStyles: Record<TenantStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  Suspended: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300',
  Trial: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
}

export function AdminDashboardPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'All' | TenantStatus>('All')
  const [tenants, setTenants] = useState<readonly Tenant[]>(initialTenants)

  const filteredTenants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return tenants.filter((tenant) => {
      const matchesStatus = status === 'All' || tenant.status === status
      const matchesQuery = tenant.name.toLowerCase().includes(normalizedQuery) || tenant.slug.includes(normalizedQuery)
      return matchesStatus && matchesQuery
    })
  }, [query, status, tenants])

  const activeCount = tenants.filter((tenant) => tenant.status === 'Active').length
  const suspendedCount = tenants.filter((tenant) => tenant.status === 'Suspended').length
  const memberCount = tenants.reduce((total, tenant) => total + tenant.members, 0)

  const toggleStatus = (tenantId: string) => {
    setTenants((current) => current.map((tenant) => {
      if (tenant.id !== tenantId) return tenant
      const nextStatus: TenantStatus = tenant.status === 'Suspended' ? 'Active' : 'Suspended'
      return { ...tenant, status: nextStatus }
    }))
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-[232px] shrink-0 border-r border-border bg-surface px-3 py-5 md:block">
          <div className="mb-7 flex items-center gap-3 px-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground"><ShieldCheck className="h-5 w-5" /></div>
            <div><p className="text-sm font-semibold">Platform Admin</p><p className="text-xs text-muted">Control center</p></div>
          </div>
          <nav className="space-y-1" aria-label="Admin navigation">
            <Link to="/admin" className="flex h-10 items-center gap-3 rounded-lg bg-brand/10 px-3 text-sm font-medium text-brand"><Building2 className="h-4 w-4" />Overview</Link>
            <Link to="/admin" className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-muted hover:bg-elevated"><Users className="h-4 w-4" />Tenants</Link>
            <Link to="/admin" className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-muted hover:bg-elevated"><CircleDollarSign className="h-4 w-4" />Subscriptions</Link>
          </nav>
          <Link to="/chat" className="absolute bottom-5 flex items-center gap-2 px-3 text-sm text-muted hover:text-brand"><ArrowLeft className="h-4 w-4" />Chat workspace</Link>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-xs font-medium uppercase text-muted">Platform overview</p><h1 className="mt-1 text-2xl font-semibold">Admin Dashboard</h1></div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /><span className="text-sm text-muted">All systems operational</span></div>
          </header>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border bg-surface p-4"><div className="flex items-center justify-between"><p className="text-sm text-muted">Total tenants</p><Building2 className="h-4 w-4 text-brand" /></div><p className="mt-3 text-3xl font-semibold">{tenants.length}</p><p className="mt-1 text-xs text-muted">+2 this month</p></article>
            <article className="rounded-xl border border-border bg-surface p-4"><div className="flex items-center justify-between"><p className="text-sm text-muted">Active tenants</p><ShieldCheck className="h-4 w-4 text-emerald-500" /></div><p className="mt-3 text-3xl font-semibold">{activeCount}</p><p className="mt-1 text-xs text-muted">{suspendedCount} suspended</p></article>
            <article className="rounded-xl border border-border bg-surface p-4"><div className="flex items-center justify-between"><p className="text-sm text-muted">Total members</p><Users className="h-4 w-4 text-brand" /></div><p className="mt-3 text-3xl font-semibold">{memberCount}</p><p className="mt-1 text-xs text-muted">Across all workspaces</p></article>
            <article className="rounded-xl border border-border bg-surface p-4"><div className="flex items-center justify-between"><p className="text-sm text-muted">Monthly revenue</p><CircleDollarSign className="h-4 w-4 text-amber-500" /></div><p className="mt-3 text-3xl font-semibold">$12.8k</p><p className="mt-1 text-xs text-emerald-600">+8.4% from last month</p></article>
          </div>

          <section className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
            <header className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">Tenants</h2><p className="mt-0.5 text-xs text-muted">Manage organizations and subscriptions</p></div><div className="flex gap-2"><label className="relative block"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tenant" className="h-9 w-full rounded-lg border border-border bg-elevated pl-9 pr-3 text-sm outline-none focus:border-brand sm:w-48" /></label><label className="relative"><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value as 'All' | TenantStatus)} className="h-9 appearance-none rounded-lg border border-border bg-elevated pl-3 pr-8 text-sm outline-none"><option>All</option><option>Active</option><option>Trial</option><option>Suspended</option></select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-muted" /></label></div></header>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-elevated text-xs uppercase text-muted"><tr><th className="px-4 py-3 font-medium">Organization</th><th className="px-4 py-3 font-medium">Members</th><th className="px-4 py-3 font-medium">Plan</th><th className="px-4 py-3 font-medium">Storage</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3"><span className="sr-only">Actions</span></th></tr></thead>
                <tbody className="divide-y divide-border">
                  {filteredTenants.map((tenant) => (
                    <tr key={tenant.id} className="text-sm hover:bg-elevated/60">
                      <td className="px-4 py-3"><p className="font-medium">{tenant.name}</p><p className="mt-0.5 text-xs text-muted">tenant_{tenant.slug}</p></td>
                      <td className="px-4 py-3 text-muted">{tenant.members}</td>
                      <td className="px-4 py-3"><span className="rounded-full border border-border px-2 py-1 text-xs">{tenant.plan}</span></td>
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-elevated"><div className="h-full bg-brand" style={{ width: `${tenant.usage}%` }} /></div><span className="text-xs text-muted">{tenant.usage}%</span></div></td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[tenant.status]}`}>{tenant.status}</span></td>
                      <td className="px-4 py-3 text-right"><button type="button" onClick={() => toggleStatus(tenant.id)} aria-label={`Change status for ${tenant.name}`} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-elevated"><MoreHorizontal className="h-4 w-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTenants.length === 0 ? <div className="px-4 py-12 text-center text-sm text-muted">No tenants match this view.</div> : null}
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}
