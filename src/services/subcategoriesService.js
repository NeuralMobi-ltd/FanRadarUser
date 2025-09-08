import http from '@/services/http'
import API_CONFIG from '@/config/api'

export const SubcategoriesService = {
	async getContent(subcategoryId, { page = 1, limit = 20 } = {}) {
		const url = API_CONFIG.subcategories.content(subcategoryId, page, limit)
		const { data } = await http.get(url)
		// Normalize
		return data?.data || data
	},
	async getFandoms(subcategoryId, { page = 1, limit = 12 } = {}) {
		const url = API_CONFIG.subcategories.fandoms(subcategoryId, page, limit)
		const { data } = await http.get(url)
		return data?.data || data
	}
}

export default SubcategoriesService
