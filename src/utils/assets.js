import API_CONFIG from '@/config/api'

// Base origin without trailing /api so we can prepend to storage paths
const baseOrigin = API_CONFIG.baseURL.replace(/\/?api\/?$/i, '')

export function normalizeAsset(path) {
  if (!path) return ''
  if (/^(?:https?:)?\/\//i.test(path) || path.startsWith('data:')) return path
  if (path.startsWith('/storage/')) return baseOrigin + path
  if (path.startsWith('storage/')) return `${baseOrigin}/${path}`
  return path
}

export function withPlaceholder(path, placeholder = '') {
  const p = normalizeAsset(path)
  return p || placeholder
}

export default normalizeAsset