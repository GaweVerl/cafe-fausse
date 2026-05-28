import { useMemo, useState } from 'react'
import { postNewsletter } from '../lib/api.js'
import { isValidEmail } from '../lib/validation.js'

export function NewsletterForm({ compact = false } = {}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [message, setMessage] = useState('')

  const canSubmit = useMemo(() => isValidEmail(email) && status !== 'submitting', [email, status])

  async function onSubmit(e) {
    e.preventDefault()
    const v = email.trim().toLowerCase()
    if (!isValidEmail(v)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setMessage('')
    try {
      const res = await postNewsletter(v)
      setStatus('success')
      setMessage(res?.message || 'Thanks for subscribing.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <form className={`newsletter ${compact ? 'newsletter--compact' : ''}`} onSubmit={onSubmit}>
      <div className="newsletter-title">Newsletter</div>
      <div className="newsletter-subtitle">
        Seasonal menus, chef’s table moments, and special events—sent occasionally.
      </div>

      <div className="newsletter-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <input
          id="newsletter-email"
          className="input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button" type="submit" disabled={!canSubmit}>
          {status === 'submitting' ? 'Submitting…' : 'Sign up'}
        </button>
      </div>

      {message ? (
        <div className={`form-message ${status === 'success' ? 'is-success' : 'is-error'}`}>
          {message}
        </div>
      ) : null}
    </form>
  )
}

