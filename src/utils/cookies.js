// Simple cookie helpers for auth persistence
// Uses secure attributes when served over HTTPS (auto)

export function setCookie(name, value, days = 7) {
  try {
    if (!name) return
    const expires = days
      ? '; expires=' + new Date(Date.now() + days * 864e5).toUTCString()
      : ''
    const secure = (location.protocol === 'https:') ? '; Secure' : ''
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value || '')}${expires}; Path=/; SameSite=Lax${secure}`
  } catch (_) { /* ignore */ }
}

export function getCookie(name) {
  try {
    const pattern = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)')
    const match = document.cookie.match(pattern)
    return match ? decodeURIComponent(match[1]) : null
  } catch (_) {
    return null
  }
}

export function deleteCookie(name) {
  try {
    document.cookie = `${encodeURIComponent(name)}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`
  } catch (_) { /* ignore */ }
}
