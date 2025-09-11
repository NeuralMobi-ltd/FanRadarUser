import i18n from '@/i18n'
import AuthService from '@/services/authService'
import { useAuthStore } from '@/store/auth'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/services/authService', () => ({
  default: {
    login: vi.fn(),
    sendPasswordResetOtp: vi.fn(),
    resetPassword: vi.fn(),
    verifyOtp: vi.fn(),
    resendOtp: vi.fn(),
    getProfile: vi.fn(),
  }
}))

// Ensure i18n exists
expect(i18n).toBeTruthy()

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('maps 401 login error to i18n invalid credentials', async () => {
    const store = useAuthStore()
    const err = { response: { status: 401 } }
    AuthService.login.mockRejectedValueOnce(err)

    const res = await store.login({ email: 'a@b.com', password: 'x' })
    expect(res.success).toBe(false)
    expect(store.error).toBe(i18n.global.t('auth.signIn.errors.invalidCredentials'))
  })

  it('sendPasswordResetOtp maps 404 to email not found', async () => {
    const store = useAuthStore()
    const err = { response: { status: 404, data: {} } }
    AuthService.sendPasswordResetOtp.mockRejectedValueOnce(err)

    const res = await store.sendPasswordResetOtp('missing@example.com')
    expect(res.success).toBe(false)
    expect(store.error).toBe('Email not found')
  })

  it('resetPassword maps 400 to OTP expired', async () => {
    const store = useAuthStore()
    const err = { response: { status: 400, data: {} } }
    AuthService.resetPassword.mockRejectedValueOnce(err)

    const res = await store.resetPassword({ email: 'a@b.com', otp: '123456', password: '123456', password_confirmation: '123456' })
    expect(res.success).toBe(false)
    expect(store.error).toBe('OTP expired')
  })
})
