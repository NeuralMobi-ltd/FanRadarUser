import http from '@/services/http'
import API_CONFIG from '@/config/api'

// Simple in-memory caches to avoid repeated network calls
const CATEGORIES_TTL_MS = 5 * 60 * 1000 // 5 minutes
let categoriesCache = { data: null, fetchedAt: 0 }
const subcategoriesCache = new Map() // key: categoryId -> { data, fetchedAt }
const inflightSubs = new Map() // key: categoryId -> Promise

// Fetch all categories (aggregates all pages from paginated API)
export async function fetchCategories({ perPage } = {}) {
  const now = Date.now()
  if (categoriesCache.data && (now - categoriesCache.fetchedAt) < CATEGORIES_TTL_MS) {
    return categoriesCache.data
  }

  const endpoint = API_CONFIG?.categories?.list || '/Y/categories'

  // Helper to request a page and normalize response
  const getPage = async (page) => {
    const params = { page }
    if (perPage) params.per_page = perPage
    const { data } = await http.get(endpoint, { params })
    const categories = data?.data?.categories || data?.categories || data?.data || []
    const pagination = data?.data?.pagination || data?.pagination || {}
    return {
      categories: Array.isArray(categories) ? categories : [],
      pagination
    }
  }

  const all = []
  let page = 1
  let hasMore = true
  let guard = 0

  try {
    while (hasMore && guard < 50) { // safety guard
      const { categories, pagination } = await getPage(page)
      for (const c of categories) {
        all.push({ id: c.id, name: c.name })
      }
      hasMore = Boolean(pagination?.has_more)
      page += 1
      guard += 1
    }
  } catch (e) {
    // Fallback: try a single request without params
    try {
      const { data } = await http.get(endpoint)
      const listRaw = data?.data?.categories || data?.categories || data?.data || []
      const list = Array.isArray(listRaw) ? listRaw.map(c => ({ id: c.id, name: c.name })) : []
      categoriesCache = { data: list, fetchedAt: now }
      return list
    } catch (_) {
      categoriesCache = { data: [], fetchedAt: now }
      return []
    }
  }

  categoriesCache = { data: all, fetchedAt: now }
  return all
}

// Fetch subcategories for a given category id
export async function fetchSubcategories(categoryId) {
  if (!categoryId) return []
  const cached = subcategoriesCache.get(categoryId)
  if (cached) return cached.data

  // De-duplicate concurrent fetches for the same category
  const inflight = inflightSubs.get(categoryId)
  if (inflight) return inflight

  const promise = (async () => {
    try {
      const { data } = await http.get(`/Y/categories/${categoryId}/subcategories`)
      // Response shape: { success, data: { category: {...}, subcategories: [...] } }
      const subs = data?.data?.subcategories || data?.subcategories || []
      const normalized = subs.map(s => ({ id: s.id, name: s.name, category_id: s.category_id }))
      subcategoriesCache.set(categoryId, { data: normalized, fetchedAt: Date.now() })
      return normalized
    } catch (e) {
      return []
    } finally {
      inflightSubs.delete(categoryId)
    }
  })()

  inflightSubs.set(categoryId, promise)
  return promise
}

export default { fetchCategories, fetchSubcategories }