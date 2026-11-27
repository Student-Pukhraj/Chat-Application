import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'

const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registrationSchema = loginSchema.extend({ name: z.string().min(2, 'Enter your name') })

type LoginValues = z.infer<typeof loginSchema>
type RegistrationValues = z.infer<typeof registrationSchema>

export function AuthPage({ registration = false }: Readonly<{ registration?: boolean }>) {
  const [mode, setMode] = useState(registration ? 'register' : 'login')
  const navigate = useNavigate()
  const isRegister = mode === 'register'
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues | RegistrationValues>({
    resolver: zodResolver(isRegister ? registrationSchema : loginSchema),
  })

  const onSubmit = async () => {
    await Promise.resolve()
    navigate('/chat')
  }

  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-7 shadow-panel sm:p-9">
        <div className="mb-8 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white"><MessageCircle className="h-6 w-6" /></div><div><p className="sr-only">Google Chat</p><h1 className="text-xl font-semibold text-ink">Google Chat</h1><p className="text-sm text-muted">{isRegister ? 'Create your workspace account' : 'Welcome back'}</p></div></div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {isRegister ? <label className="block text-sm font-medium text-ink">Name<input className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="Alex Morgan" {...register('name')} /></label> : null}
          <label className="block text-sm font-medium text-ink">Email address<input type="email" className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="you@company.com" {...register('email')} /></label>
          {'email' in errors && errors.email ? <p className="text-xs text-red-600">{errors.email.message}</p> : null}
          <label className="block text-sm font-medium text-ink">Password<input type="password" className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="At least 6 characters" {...register('password')} /></label>
          {'password' in errors && errors.password ? <p className="text-xs text-red-600">{errors.password.message}</p> : null}
          <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>{isRegister ? 'Create account' : 'Sign in'}</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">{isRegister ? 'Already have an account?' : 'New to Google Chat?' } <button className="font-medium text-brand hover:underline" onClick={() => setMode(isRegister ? 'login' : 'register')}>{isRegister ? 'Sign in' : 'Create account'}</button></p>
        {isRegister ? null : <Link to="/chat" className="mt-3 block text-center text-xs text-muted hover:text-brand">Continue with mock workspace</Link>}
      </section>
    </main>
  )
}
