import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const AuthService = {
  async login(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      const name = (payload?.email || 'user').split('@')[0]
      return {
        token: 'mock-token-' + Date.now(),
        user: {
          id: 1,
          username: name,
          email: payload?.email || `${name}@example.com`,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=256`,
          isVerified: false,
        }
      }
    }
    const { data } = await http.post(API_CONFIG.auth.login, payload)
    return data
  },
  async register(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    // Simplified: no image handling. Accept plain object (JSON) only.
    const body = { ...payload }
    if (body.password && !body.password_confirmation) {
      body.password_confirmation = body.password
    }
    const { data } = await http.post(API_CONFIG.auth.register, body)
    return data
  },
  async getProfile() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      const saved = localStorage.getItem('user')
      const user = saved ? JSON.parse(saved) : { id: 1, username: 'user', email: 'user@example.com' }
      return user
    }
    const { data } = await http.get(API_CONFIG.auth.profile)
    return data
  },
  async updateProfile(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, user: payload }
    }
    let body = payload
    let headers = {}
    // Accept either plain object or FormData. If object contains File(s), convert.
    if (!(payload instanceof FormData)) {
      const hasFile = Object.values(payload || {}).some(v => v instanceof File || v instanceof Blob)
      if (hasFile) {
        const fd = new FormData()
        Object.entries(payload).forEach(([k, v]) => {
          if (Array.isArray(v)) {
            v.forEach(item => fd.append(`${k}[]`, item))
          } else if (v !== undefined && v !== null) {
            fd.append(k, v)
          }
        })
        body = fd
      }
    }
    if (body instanceof FormData) headers['Content-Type'] = 'multipart/form-data'
    const { data } = await http.post(API_CONFIG.auth.updateProfile, body, { headers })
    return data
  },
  async updateAvatar(file) {
    const fd = new FormData()
    fd.append('profile_image', file)
    return this.updateProfile(fd)
  },
  async updateCover(file) {
    const fd = new FormData()
    fd.append('background_image', file)
    return this.updateProfile(fd)
  },
  async logout() {
    if (API_CONFIG.useMocks) {
      await delay(150)
      return { success: true }
    }
    try {
      const { data } = await http.post(API_CONFIG.auth.logout || '/api/Y/auth/logout')
      return data
    } catch (e) {
      // Even if backend logout fails, proceed to clear client session
      return { success: false, error: e?.response?.data || e.message }
    }
  }
}

export default AuthService
