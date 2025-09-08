import { defineStore } from 'pinia'
import { TagsService } from '@/services/tagsService'
import { FandomsService } from '@/services/fandomsService'

export const useTrendsStore = defineStore('trends', {
  state: () => ({
  trendingCommunities: [],
  trendingHashtags: [],
  recommendedUsers: [],
  recentActivity: [],
  }),
  
  getters: {
    topGrowingHashtags: (state) => 
      state.trendingHashtags
        .slice()
        .sort((a, b) => (Number(b.growth || 0) - Number(a.growth || 0)))
        .slice(0, 3),
    
    popularCommunities: (state) => 
      state.trendingCommunities.sort((a, b) => {
        const aMembers = parseFloat(a.members.replace('M', '')) * 1000000
        const bMembers = parseFloat(b.members.replace('M', '')) * 1000000
        return bMembers - aMembers
      }),
    
    recentActivitySorted: (state) => 
      state.recentActivity.sort((a, b) => b.date - a.date)
  },
  
  actions: {
    _formatMembers(n = 0) {
      const num = Number(n) || 0
      if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
      if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
      return String(num)
    },
    async fetchTrendingHashtags(limit = 10) {
      try {
        const tags = await TagsService.trending(limit)
        // Map to current shape { name, posts, growth }
        this.trendingHashtags = (tags || []).map(t => ({
          id: t.id ?? t.hashtag_id ?? t._id,
          name: t.name ?? t.tag_name ?? t.tag ?? '',
          posts: t.uses ?? t.posts ?? t.posts_count ?? 0
        }))
      } catch (e) {
        // keep existing fallback
      }
    },
    async fetchTrendingFandoms(limit = 10) {
      try {
        const res = await FandomsService.trending(limit)
        const list = res?.data?.fandoms || res?.fandoms || []
        this.trendingCommunities = list.map(f => {
          const id = f.id ?? f.fandom_id ?? f._id
          const name = f.name ?? f.title ?? ''
          const avatar = f.logo_image || f.cover_image || '/images/FanRadar.png'
          const membersCount = Number(f.members_count ?? f.members ?? 0) || 0
          const joined = Boolean(f.is_member ?? f.joined ?? false)
          return {
            id,
            name,
            avatar,
            membersCount,
            members: this._formatMembers(membersCount),
            joined
          }
        })
      } catch (e) {
        // keep existing fallback
      }
    },
    joinCommunity(communityId) {
      // legacy local increment without backend
      const community = this.trendingCommunities.find(c => c.id === communityId)
      if (community) {
        community.membersCount = (Number(community.membersCount) || 0) + 1
        community.members = this._formatMembers(community.membersCount)
      }
    },

    async joinFandom(communityId) {
      const c = this.trendingCommunities.find(x => x.id === communityId)
      if (!c || c.joined) return
      // optimistic
      c.joined = true
      c.membersCount = (Number(c.membersCount) || 0) + 1
      c.members = this._formatMembers(c.membersCount)
      try {
        await FandomsService.join(communityId)
      } catch (e) {
        // revert on failure
        c.joined = false
        c.membersCount = Math.max(0, (Number(c.membersCount) || 1) - 1)
        c.members = this._formatMembers(c.membersCount)
        throw e
      }
    },

    async leaveFandom(communityId) {
      const c = this.trendingCommunities.find(x => x.id === communityId)
      if (!c || !c.joined) return
      // optimistic
      c.joined = false
      c.membersCount = Math.max(0, (Number(c.membersCount) || 0) - 1)
      c.members = this._formatMembers(c.membersCount)
      try {
        await FandomsService.leave(communityId)
      } catch (e) {
        // revert on failure
        c.joined = true
        c.membersCount = (Number(c.membersCount) || 0) + 1
        c.members = this._formatMembers(c.membersCount)
        throw e
      }
    },
    
    followUser(userId) {
      // This would typically interact with a backend
      console.log(`Following user ${userId}`)
    },
    
    addActivity(activity) {
      const newActivity = {
        id: Date.now(),
        ...activity,
        date: new Date()
      }
      this.recentActivity.unshift(newActivity)
      
      // Keep only the latest 10 activities
      if (this.recentActivity.length > 10) {
        this.recentActivity = this.recentActivity.slice(0, 10)
      }
    },
    
    updateHashtagGrowth(hashtag, growth) {
      const tag = this.trendingHashtags.find(t => t.name === hashtag)
      if (tag) {
        tag.growth = growth
      }
    }
  }
})
