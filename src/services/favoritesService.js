import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const FavoritesService = {
	async favoriteProduct(id) {
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { success: true }
		}
		const { data } = await http.post(API_CONFIG.favorites.product.favorite(id))
		return data
	},
	async unfavoriteProduct(id) {
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { success: true }
		}
		try {
			const { data } = await http.delete(API_CONFIG.favorites.product.remove(id))
			return data
		} catch (err) {
			const { data } = await http.post(API_CONFIG.favorites.product.remove(id), { _method: 'DELETE' })
			return data
		}
	},
	async myFavoriteProducts(params = {}) {
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { products: [] }
		}
		const { data } = await http.get(API_CONFIG.favorites.myFavoriteProducts, { params })
		return data
	}
}

export default FavoritesService
