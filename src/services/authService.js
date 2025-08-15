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
    const { data } = await http.post(API_CONFIG.auth.register, payload)
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
    const { data } = await http.put(API_CONFIG.auth.updateProfile, payload)
    return data
  },
  async updateAvatar(formData) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.put(API_CONFIG.auth.updateAvatar, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
  },
  async updateCover(formData) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.put(API_CONFIG.auth.updateCover, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
  }
}

export default AuthService
