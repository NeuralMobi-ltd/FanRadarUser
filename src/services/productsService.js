import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

const pickFirstMediaUrl = (medias) => {
	if (!Array.isArray(medias) || medias.length === 0) return null
	const first = medias[0]
	if (!first) return null
	if (typeof first === 'string') return first
	return first.url || first.path || first.src || null
}

const normalizeProduct = (p) => {
	if (!p) return null
	// Backend fields: product_name, price as string, ratings_average/count, subcategory_id, etc.
	const priceNum = typeof p.price === 'string' ? parseFloat(p.price) : (p.price || 0)
	const image = p.image || p.images?.[0] || pickFirstMediaUrl(p.medias) || 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
	
	return {
		id: p.id,
		name: p.product_name || p.name || '',
		description: p.description || '',
		category: p.category || p.category_name || p.subcategory?.name || '',
		subcategoryId: p.subcategory_id ?? p.subcategory?.id ?? null,
		subcategoryName: p.subcategory?.name || null,
		categoryId: p.category_id ?? p.subcategory?.category_id ?? null,
		brand: p.brand || p.brand_name || 'Unknown',
		price: Number.isFinite(priceNum) ? priceNum : 0,
		originalPrice: p.originalPrice || p.original_price || null,
		discount: p.discount ?? p.promotion ?? null,
		rating: p.rating ?? p.average_rating ?? p.ratings_average ?? 0,
		reviews: p.reviews ?? p.reviews_count ?? p.ratings_count ?? 0,
		stock: p.stock ?? p.stock_left ?? 0,
		image,
		isNew: !!p.isNew,
		isWishlisted: !!(p.isWishlisted ?? p.is_favorite ?? p.is_wishlisted),
	}
}

export const ProductsService = {
	async list(params = {}) {
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { products: [], pagination: { page: 1, total: 0, per_page: 0 } }
		}
		const { data } = await http.get(API_CONFIG.products.list, { params })
		// Accept both { data: { products, ... } } or array
		const payload = data?.data || data
		const arr = payload?.products || payload?.items || payload || []
		const products = Array.isArray(arr) ? arr.map(normalizeProduct) : []
		const pagination = payload?.pagination || {
			page: payload?.current_page || params?.page || 1,
			per_page: payload?.per_page || params?.limit || products.length,
			total: payload?.total || products.length,
		}
		return { products, pagination }
	},

	async detail(id) {
		if (!id) throw new Error('product id required')
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { product: null }
		}
		const { data } = await http.get(API_CONFIG.products.detail(id))
		const payload = data?.data || data
		return { product: normalizeProduct(payload?.product || payload) }
	},

	async favoriteProduct(id) {
		if (!id) throw new Error('product id required')
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { success: true }
		}
		const { data } = await http.post(API_CONFIG.favorites.product.favorite(id))
		return data
	},

	async unfavoriteProduct(id) {
		if (!id) throw new Error('product id required')
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { success: true }
		}
		// Primary DELETE endpoint
		try {
			const { data } = await http.delete(API_CONFIG.favorites.product.remove(id))
			return data
		} catch (err) {
			// Fallbacks if backend needs method override
			try {
				const { data } = await http.post(API_CONFIG.favorites.product.remove(id), { _method: 'DELETE' })
				return data
			} catch (e2) {
				const { data } = await http.request({ url: API_CONFIG.favorites.product.remove(id), method: 'DELETE' })
				return data
			}
		}
	},

	async myFavoriteProducts(params = {}) {
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { products: [], pagination: { page: 1, total: 0, per_page: 0 } }
		}
		const { data } = await http.get(API_CONFIG.favorites.myFavoriteProducts, { params })
		const payload = data?.data || data
		const arr = payload?.products || payload?.items || payload || []
		const products = Array.isArray(arr) ? arr.map(normalizeProduct) : []
		const pagination = payload?.pagination || {
			page: payload?.current_page || params?.page || 1,
			per_page: payload?.per_page || params?.limit || products.length,
			total: payload?.total || products.length,
		}
		return { products, pagination }
	},
}

export default ProductsService
