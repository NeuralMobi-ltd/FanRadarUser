import http from '@/services/http'

// Ratings service for products
// POST /api/ratings { rateable_id, evaluation, commentaire? }
// Backend infers App\\Models\\Product as rateable_type (per provided response)

const RatingsService = {
	async rateProduct({ rateable_id, evaluation, commentaire }) {
		const payload = { rateable_id, evaluation }
		if (commentaire) payload.commentaire = commentaire
		const { data } = await http.post('/ratings', payload)
		// Expected shape:
		// { success, message, data: { rating: {...}, statistics: { average_rating, total_ratings } } }
		return data
	},

	// Optionally fetch product rating statistics
	async getProductRatingStats(productId) {
		const { data } = await http.get(`/products/${productId}/ratings/statistics`)
		return data
	}
}

export default RatingsService

