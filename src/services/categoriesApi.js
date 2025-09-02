import http from '@/services/http'
import API_CONFIG from '@/config/api'

// Fetch all categories (tries configured endpoint then falls back to /Y/categories)
export async function fetchCategories() {
  let data
  try {
    ({ data } = await http.get(API_CONFIG.categories.list))
  } catch (_) {
    // Fallback to base endpoint if /list not supported by backend
    ({ data } = await http.get('/Y/categories'))
  }
  const list = data?.data?.categories || data?.categories || data || []
  return Array.isArray(list) ? list.map(c => ({ id: c.id, name: c.name })) : []
}

// Fetch subcategories for a given category id
export async function fetchSubcategories(categoryId) {
  if (!categoryId) return []
  try {
    const { data } = await http.get(`/Y/categories/${categoryId}/subcategories`)
    // Response shape: { success, data: { category: {...}, subcategories: [...] } }
    const subs = data?.data?.subcategories || data?.subcategories || []
    return subs.map(s => ({ id: s.id, name: s.name, category_id: s.category_id }))
  } catch (e) {
    return []
  }
}

export default { fetchCategories, fetchSubcategories }