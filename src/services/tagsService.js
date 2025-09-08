import http from '@/services/http'
import API_CONFIG from '@/config/api'

export const TagsService = {
	async trending(limit = 10) {
		const { data } = await http.get(API_CONFIG.hashtags.trending(limit))
		// Expect { success, data: { hashtags: [...] } }
		return data?.data?.hashtags || data?.hashtags || []
	},
	async postsById(hashtagId, { page = 1, limit = 10 } = {}) {
		const { data } = await http.get(API_CONFIG.hashtags.postsById(hashtagId, page, limit))
		// Expect { success, data: { posts: [...], pagination: {...} } }
		return data?.data || data
	}
}

export default TagsService
