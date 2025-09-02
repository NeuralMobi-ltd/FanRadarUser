import axios from 'axios'
import API_CONFIG from '@/config/api'
import { getCookie } from '@/utils/cookies'

// Axios instance with interceptors
const http = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 15000,
  headers: {
    Accept: 'application/json'
  }
})

// Attach auth token if available
http.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  if (!token) token = getCookie('auth_token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  // Auto JSON content-type for JSON bodies
  if (config.data && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }
  // Remove explicit content-type for FormData (browser will set boundary)
  if (config.data instanceof FormData && config.headers['Content-Type']) {
    delete config.headers['Content-Type']
  }
  return config
})

// Global response handler
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      // Token invalid/expired: clear and redirect to login
      localStorage.removeItem('token')
      // Optionally notify user
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default http
