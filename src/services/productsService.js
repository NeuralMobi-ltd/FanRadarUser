import API_CONFIG from '@/config/api'
import http from '@/services/http'
import { resolveStorageUrl } from '@/utils/media'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

const pickFirstMediaUrl = (medias) => {
	if (!Array.isArray(medias) || medias.length === 0) return null
	const first = medias[0]
	if (!first) return null
	if (typeof first === 'string') return first
	return first.url || first.path || first.src || first.file_path || null
}

const normalizeProduct = (p) => {
	if (!p) return null
	// Backend fields: product_name, price as string, ratings_average/count, subcategory_id, etc.
	const priceNum = typeof p.price === 'string' ? parseFloat(p.price) : (p.price || 0)
	  let image = p.image 
			|| p.images?.[0] 
			|| pickFirstMediaUrl(p.media) 
			|| pickFirstMediaUrl(p.medias)

	// Some APIs return media as { file_path: 'products/images/xyz.png' }
		if (!image && Array.isArray(p.media) && p.media[0]?.file_path) image = p.media[0].file_path
		if (!image && Array.isArray(p.medias) && p.medias[0]?.file_path) image = p.medias[0].file_path

	// Normalize storage URLs
	if (image) {
		image = resolveStorageUrl(image)
	}

	if (!image) {
		image = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
	}
	
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

// Normalize drag product for product drops section
const normalizeDragProduct = (p) => {
	if (!p) return null
	const priceNum = typeof p.price === 'string' ? parseFloat(p.price) : (p.price || 0)
	const originalPriceNum = typeof p.original_price === 'string' ? parseFloat(p.original_price) : (p.original_price || priceNum)
	const discountPercent = originalPriceNum > priceNum ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100) : 0
	  let image = p.image || p.images?.[0] || pickFirstMediaUrl(p.media) || pickFirstMediaUrl(p.medias)
		if (!image && Array.isArray(p.media) && p.media[0]?.file_path) image = p.media[0].file_path
		if (!image && Array.isArray(p.medias) && p.medias[0]?.file_path) image = p.medias[0].file_path
	if (image) image = resolveStorageUrl(image)
	if (!image) image = 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
	
	// Enhanced status handling
	const isActive = p.status === 'active'
	const isUpcoming = p.status === 'upcoming'
	const isExpired = p.status === 'expired'
	
	// Calculate urgency based on stock percentage and time remaining
	let urgencyLevel = p.urgency_level || 'low'
	if (p.stock_percentage < 10) urgencyLevel = 'critical'
	else if (p.stock_percentage < 25) urgencyLevel = 'high'
	else if (p.stock_percentage < 50) urgencyLevel = 'medium'
	
	// Enhanced features based on actual data
	const features = []
	if (p.is_limited) features.push('🎯 Limited Edition')
	if (discountPercent > 0) features.push(`💰 ${discountPercent}% OFF`)
	if (p.stock_percentage < 25) features.push('⚡ Low Stock Alert')
	if (p.favorites_count > 0) features.push(`❤️ ${p.favorites_count} Favorites`)
	if (p.ratings_count > 0) features.push(`⭐ ${p.ratings_count} Reviews`)
	features.push('📦 Fast Shipping')
	
	return {
		id: p.id,
		title: p.product_name || p.name || 'Limited Edition Product',
		subtitle: p.description || 'Exclusive limited time offer',
		category: p.subcategory?.name || 'Limited Edition',
		badge: isActive ? 'LIVE NOW' : isUpcoming ? 'UPCOMING' : isExpired ? 'EXPIRED' : 'LIMITED',
		urgencyLevel,
		status: p.status,
		dropPrice: priceNum,
		originalPrice: originalPriceNum,
		discount: discountPercent,
		totalStock: Math.round(p.stock / (p.stock_percentage / 100)) || 100,
		stockLeft: p.stock || 0,
		stockPercentage: p.stock_percentage,
		endTime: p.sale_end_date,
		startTime: p.sale_start_date,
		timeRemainingDays: p.time_remaining_days,
		daysUntilStart: p.days_until_start,
		image,
		features,
		rating: p.average_rating || 0,
		reviews: p.ratings_count || 0,
		favorites: p.favorites_count || 0,
		isActive,
		isUpcoming,
		isExpired
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

	async search(params = {}) {
		// For backend-powered product search
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { products: [], pagination: { page: 1, total: 0, per_page: 0, last_page: 1 } }
		}
		const { data } = await http.get(API_CONFIG.search.products(params))
		const payload = data?.data || data
		const arr = payload?.products || []
		const products = Array.isArray(arr) ? arr.map(normalizeProduct) : []
		const pg = payload?.pagination || {}
		const page = pg.page || pg.current_page || 1
		const last = pg.last_page || pg.total_pages || 1
		const pagination = {
			page,
			per_page: pg.per_page || pg.perPage || params?.per_page || 20,
			total: pg.total || pg.total_items || products.length,
			last_page: last,
			has_more: typeof pg.has_more === 'boolean' ? pg.has_more : page < last
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

	async getDragProducts(params = {}) {
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { products: [], statistics: {}, pagination: { page: 1, total: 0, per_page: 0 } }
		}
		const { data } = await http.get(API_CONFIG.products.drag, { params })
		const payload = data?.data || data
		const arr = payload?.products || payload?.items || payload || []
		const products = Array.isArray(arr) ? arr.map(normalizeDragProduct) : []
		const statistics = payload?.statistics || {}
		const pagination = payload?.pagination || {
			page: payload?.current_page || params?.page || 1,
			per_page: payload?.per_page || params?.limit || products.length,
			total: payload?.total || products.length,
		}
		return { products, statistics, pagination }
	},
}

export default ProductsService
