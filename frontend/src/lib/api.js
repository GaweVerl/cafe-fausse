const API_BASE = 'http://127.0.0.1:5000'

async function requestJson(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }

  if (!res.ok) {
    const message =
      (data && (data.error || data.message)) || `Request failed (${res.status})`
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}

export function postNewsletter(email) {
  return requestJson('/api/newsletter', { method: 'POST', body: { email } })
}

export function postReservation(payload) {
  return requestJson('/api/reservations', { method: 'POST', body: payload })
}

