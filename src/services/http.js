import axios from 'axios'
import API_CONFIG from '@/config/api'

// Axios instance with interceptors
const http = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 15000
})

// Attach auth token if available
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
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
