import { defineStore } from 'pinia'

export const useTrendsStore = defineStore('trends', {
  state: () => ({
    trendingCommunities: [
      {
        id: 1,
        name: 'Anime & Manga',
        avatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100',
        members: '2.5M'
      },
      {
        id: 2,
        name: 'Marvel Universe',
        avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100',
        members: '1.8M'
      },
      {
        id: 3,
        name: 'K-Pop',
        avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100',
        members: '3.2M'
      },
      {
        id: 4,
        name: 'Gaming',
        avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100',
        members: '4.1M'
      }
    ],
    
    trendingHashtags: [
      { name: 'LeagueofLegends', posts: '15.2K', growth: 24 },
      { name: 'Anime2024', posts: '8.7K', growth: 18 },
      { name: 'MarvelPhase5', posts: '12.3K', growth: 35 },
      { name: 'KPopNews', posts: '22.1K', growth: 12 },
      { name: 'GameDev', posts: '6.8K', growth: 45 }
    ],
    
    recommendedUsers: [
      {
        id: 1,
        name: 'Akira Tanaka',
        username: 'akira_anime',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 2,
        name: 'Sophie Chen',
        username: 'sophie_kpop',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      {
        id: 3,
        name: 'GameMaster Pro',
        username: 'gamemaster_pro',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      }
    ],
  }),
  
  getters: {
    topGrowingHashtags: (state) => 
      state.trendingHashtags.sort((a, b) => b.growth - a.growth).slice(0, 3),
    
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
    joinCommunity(communityId) {
      const community = this.trendingCommunities.find(c => c.id === communityId)
      if (community) {
        const members = parseFloat(community.members.replace('M', '')) * 1000000 + 1
        community.members = `${(members / 1000000).toFixed(1)}M`
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
