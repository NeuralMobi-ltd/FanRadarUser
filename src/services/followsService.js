import http from '@/services/http'
import API_CONFIG from '@/config/api'

export const FollowsService = {
	async follow(userId){
		// POST follow endpoint; expect 201 or success message
		const { data } = await http.post(API_CONFIG.users.follow(userId))
		return data
	},
	async unfollow(userId){
		// DELETE unfollow endpoint; backend may return 200 with success or 4xx if not following
		const { data } = await http.delete(API_CONFIG.users.unfollow(userId))
		return data
	},
	async toggle(userId) {
		const { data } = await http.post(API_CONFIG.users.follow(userId))
		// Expected shape per docs: { following:true|false, follower_count, following_count }
		return data
	},
	async followers(userId, params = {}) {
		const { data } = await http.get(API_CONFIG.users.followers(userId), { params })
		return data
	},
	async following(userId, params = {}) {
		const { data } = await http.get(API_CONFIG.users.following(userId), { params })
		return data
	},
	async userPosts(userId, params = {}) {
		const { data } = await http.get(API_CONFIG.users.posts(userId), { params })
		return data
	}
}

export default FollowsService
