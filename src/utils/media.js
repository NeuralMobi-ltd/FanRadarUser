// Simple shared image helpers and URL normalizer for storage assets
import API_CONFIG from '@/config/api'

// Derive API base origin without trailing /api
export function getApiBaseOrigin() {
  try {
    const base = API_CONFIG?.baseURL || ''
    if (!base) return ''
    // Ensure we get origin (protocol + host) and optional path without trailing /api
    const url = new URL(base, base.startsWith('http') ? undefined : 'https://placeholder.invalid')
    let origin = url.origin
    // If base already contains path segments beyond origin (e.g., /api), strip trailing /api
    const path = url.pathname || ''
    if (path && path !== '/') {
      const trimmed = path.endsWith('/') ? path.slice(0, -1) : path
      if (trimmed.endsWith('/api')) {
        return origin + trimmed.slice(0, -4)
      }
    }
    return origin
  } catch {
    // Fallback to production API origin
    return 'https://api.fanradars.com'
  }
}

// Normalize any "storage"-backed media path to absolute URL
// Accepts values like:
//  - "storage/profile/abc.jpg" or "/storage/profile/abc.jpg"
//  - "products/images/xyz.png" (no storage prefix from API) -> prefix with /storage
//  - "https://api.fanradars.com/api/storage/profile/abc.jpg" -> strip /api
//  - already absolute "https://api.fanradars.com/storage/..." -> return as-is
export function resolveStorageUrl(input) {
  if (!input) return ''
  let path = String(input)

  // If it's already an absolute URL
  if (/^https?:\/\//i.test(path)) {
    // Normalize any /api/storage to /storage
    return path.replace('/api/storage/', '/storage/')
  }

  // Ensure it starts with /storage/; some APIs return just "products/images/..."
  if (!path.startsWith('/')) path = '/' + path
  if (!path.startsWith('/storage/')) path = '/storage' + (path.startsWith('/storage') ? '' : path)
  // Above line ensures "/storage" + "/products/images/..." -> "/storage/products/images/..."

  const base = getApiBaseOrigin()
  return base + path
}

export function getHashtagImage(tag = '') {
  const key = String(tag || '').toLowerCase()
  const map = {
    gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=600&fit=crop',
    music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&h=600&fit=crop',
    anime: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=600&fit=crop',
    trending: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=600&fit=crop'
  }
  return map[key] || 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
}

export function getCategoryImage(categoryName = '') {
  const key = String(categoryName || '').toLowerCase()
  const map = {
    sport: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1600&h=600&fit=crop',
    gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=600&fit=crop',
    anime: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=600&fit=crop',
    music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&h=600&fit=crop',
    movies: 'https://images.unsplash.com/photo-1489599510041-0c5812f0d09d?w=1600&h=600&fit=crop'
  }
  return map[key] || 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
}

export default { getHashtagImage, getCategoryImage, resolveStorageUrl, getApiBaseOrigin }
