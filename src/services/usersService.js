import http from '@/services/http'
import API_CONFIG from '@/config/api'

export const UsersService = {
  async profile(userId){
    const { data } = await http.get(API_CONFIG.users.profileById(userId))
    return data
  },
  async follow(userId) {
    const { data } = await http.post(API_CONFIG.users.follow(userId))
    return data
  },
  async unfollow(userId) {
    // backend uses DELETE /Y/users/{id}/unfollow
    const { data } = await http.delete(API_CONFIG.users.unfollow(userId))
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
  async posts(userId, params = {}) {
    const { data } = await http.get(API_CONFIG.users.posts(userId), { params })
    return data
  }
}

export default UsersService