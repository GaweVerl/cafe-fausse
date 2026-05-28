export function isValidEmail(email) {
  const v = String(email || '').trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function clampInt(value, { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = {}) {
  const n = Number.parseInt(String(value), 10)
  if (Number.isNaN(n)) return null
  return Math.max(min, Math.min(max, n))
}

