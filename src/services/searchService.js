import http from '@/services/http'
import API_CONFIG from '@/config/api'
import normalizeAsset from '@/utils/assets'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const SearchService = {
  async global(q, type) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      // Return shape compatible with store expectations
      return {
        results: { people: [], posts: [], news: [], fandoms: [] },
        total: 0
      }
    }
    const { data } = await http.get(API_CONFIG.search.global(q, type))
    return data
  },
  async suggestions(q) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { suggestions: [] }
    }
    const { data } = await http.get(API_CONFIG.search.suggestions(q))
    return data
  },
  async users({ q, page = 1, limit = 20 }) {
    if (!q) return { users: [], pagination: emptyPagination() }
  const { data } = await http.get(API_CONFIG.search.users(q, page, limit))
  // Backend shape: { success: true, data: { users: [...], pagination: {...}, ...otherMeta } }
  const inner = data?.data || {}
  return { users: inner.users || [], pagination: inner.pagination || emptyPagination(), raw: inner }
  },
  async posts(params = {}) {
    if (!params.q && !params.tag && !params.tags && !params.subcategory_id) {
      return { posts: [], pagination: emptyPagination() }
    }
    const { data } = await http.get(API_CONFIG.search.posts(params))
    return unwrap(data, 'posts')
  },
  async fandoms({ q, page = 1, limit = 20 }) {
    if (!q) return { fandoms: [], pagination: emptyPagination() }
    const { data } = await http.get(API_CONFIG.search.fandoms(q, page, limit))
    return unwrap(data, 'fandoms')
  }
}

export default SearchService

// Helpers
function emptyPagination() {
  return { page: 1, per_page: 0, total: 0, last_page: 1, has_more: false }
}

function unwrap(raw, key) {
  // Expected backend shape: { success: true, data: { [key]: [...], pagination: {...} } }
  if (raw?.data?.data) raw = raw.data // axios maybe wraps
  const inner = raw?.data || raw
  const pg = inner?.pagination || {}
  const page = pg.page || pg.current_page || 1
  const last = pg.last_page || pg.total_pages || 1
  const normalizedPagination = {
    page,
    per_page: pg.per_page || pg.perPage || pg.per_page || pg.items_per_page || 0,
    total: pg.total || pg.total_items || pg.totalItems || 0,
    last_page: last,
    has_more: typeof pg.has_more === 'boolean' ? pg.has_more : page < last
  }
  return {
    [key]: inner?.[key] || [],
    pagination: normalizedPagination
  }
}
