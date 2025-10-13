import API_CONFIG from '@/config/api'

// Base origin without trailing /api so we can prepend to storage paths
const baseOrigin = API_CONFIG.baseURL.replace(/\/api\/?$/i, '')

export function normalizeAsset(path) {
  if (!path) return ''
  const p = String(path).trim()
  // Absolute URLs and data URIs pass through
  if (/^(?:https?:)?\/\//i.test(p) || p.startsWith('data:')) return p

  // Already a public storage path
  if (p.startsWith('/storage/')) return baseOrigin + p
  if (p.startsWith('storage/')) return `${baseOrigin}/${p}`

  // Some backends may return /api/storage/... even for public files
  if (p.startsWith('/api/storage/')) return baseOrigin + p.replace(/^\/api\//i, '')

  // Known backend-relative buckets that live under /storage
  // e.g., 'category/images/xxx.jpg', 'posts/images/...', 'avatars/...'
  if (/^(category|categories|profile_images|avatars?|posts|news|fandoms|products)\//i.test(p)) {
    return `${baseOrigin}/storage/${p.replace(/^\/+/, '')}`
  }

  // Default: leave untouched (could be an app-local path or imported asset)
  return p
}

export function withPlaceholder(path, placeholder = '') {
  const p = normalizeAsset(path)
  return p || placeholder
}

export default normalizeAsset