import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../app/App'

describe('Google Chat app', () => {
  it('renders the login screen at /login', () => {
    globalThis.history.pushState({}, '', '/login')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Google Chat' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('renders the platform admin dashboard at /admin', () => {
    globalThis.history.pushState({}, '', '/admin')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Admin Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tenants' })).toBeInTheDocument()
  })
})
