import { useMemo, useState } from 'react'
import { postReservation } from '../lib/api.js'
import { clampInt, isValidEmail } from '../lib/validation.js'

function toIsoLocal(dtLocalValue) {
  // HTML datetime-local gives "YYYY-MM-DDTHH:mm" without seconds/timezone.
  return dtLocalValue || ''
}

export function Reservations() {
  const [timeSlot, setTimeSlot] = useState('')
  const [guests, setGuests] = useState('2')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [message, setMessage] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  const guestsInt = useMemo(() => clampInt(guests, { min: 1, max: 20 }), [guests])
  const canSubmit = useMemo(() => {
    if (status === 'submitting') return false
    if (!timeSlot) return false
    if (!guestsInt || guestsInt < 1) return false
    if (!name.trim()) return false
    if (!isValidEmail(email)) return false
    return true
  }, [email, guestsInt, name, status, timeSlot])

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setMessage('')
    setConfirmation(null)

    const payload = {
      time_slot: toIsoLocal(timeSlot),
      number_of_guests: guestsInt,
      customer_name: name.trim(),
      email_address: email.trim().toLowerCase(),
      phone_number: phone.trim() ? phone.trim() : null,
    }

    try {
      const res = await postReservation(payload)
      setStatus('success')
      setConfirmation(res)
      setMessage(res?.message || 'Reservation confirmed.')
    } catch (err) {
      setStatus('error')
      setMessage(err?.message || 'Unable to create reservation. Please try again.')
    }
  }

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <div className="page-header">
            <h1 className="h1">Reservations</h1>
            <p className="muted">Select a time and we’ll reserve an available table for your party.</p>
          </div>

          <div className="two-col">
            <form className="card form" onSubmit={onSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label className="label" htmlFor="timeSlot">
                    Time Slot
                  </label>
                  <input
                    id="timeSlot"
                    className="input"
                    type="datetime-local"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="label" htmlFor="guests">
                    Number of Guests
                  </label>
                  <input
                    id="guests"
                    className="input"
                    type="number"
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="label" htmlFor="name">
                    Customer Name
                  </label>
                  <input
                    id="name"
                    className="input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="field">
                  <label className="label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    className="input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="field field--full">
                  <label className="label" htmlFor="phone">
                    Phone Number <span className="muted">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    className="input"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(202) 555-4567"
                  />
                </div>
              </div>

              <button className="button button--wide" type="submit" disabled={!canSubmit}>
                {status === 'submitting' ? 'Booking…' : 'Book reservation'}
              </button>

              {message ? (
                <div className={`form-message ${status === 'success' ? 'is-success' : 'is-error'}`}>
                  {message}
                </div>
              ) : null}
            </form>

            <div className="card">
              <h2 className="h2">What happens next?</h2>
              <p className="body">
                If your chosen time is available, we’ll assign a table from our dining room (30 tables total)
                and send back a confirmation immediately.
              </p>
              <p className="body muted">
                If the time slot is fully booked, you’ll be asked to select another time.
              </p>

              {confirmation ? (
                <div className="confirmation">
                  <div className="confirmation-title">Confirmation</div>
                  <div className="confirmation-row">
                    <span className="muted">Reservation ID</span>
                    <span className="mono">{confirmation.reservation_id}</span>
                  </div>
                  <div className="confirmation-row">
                    <span className="muted">Table</span>
                    <span className="mono">{confirmation.table_number}</span>
                  </div>
                  <div className="confirmation-row">
                    <span className="muted">Time Slot</span>
                    <span className="mono">{confirmation.time_slot}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

