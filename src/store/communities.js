import { defineStore } from 'pinia'

export const useCommunitiesStore = defineStore('communities', {
  state: () => ({
    allCommunities: [
      {
        id: 1,
        name: 'Premier League Fans',
        description: 'The ultimate community for Premier League football fans. Match discussions, transfer news, and more!',
        members: '234K',
        logo: 'https://logo.clearbit.com/premierleague.com',
        coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=300&fit=crop',
        category: 'sport'
      },
      {
        id: 2,
        name: 'NBA Central',
        description: 'All things NBA. Game threads, highlights, player discussions and basketball strategies.',
        members: '189K',
        logo: 'https://logo.clearbit.com/nba.com',
        coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=300&fit=crop',
        category: 'sport'
      },
      {
        id: 3,
        name: 'Formula 1',
        description: 'The fastest community on FanRadar! Race discussions, team updates, and technical analyses.',
        members: '156K',
        logo: 'https://logo.clearbit.com/formula1.com',
        coverImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=300&fit=crop',
        category: 'sport'
      },
      {
        id: 4,
        name: 'Tennis World',
        description: 'Grand Slams, ATP & WTA tours, and everything tennis related. From amateurs to professionals!',
        members: '98K',
        logo: 'https://logo.clearbit.com/atptour.com',
        coverImage: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=300&fit=crop',
        category: 'sport'
      },
      {
        id: 5,
        name: 'Cricket Fans',
        description: 'Test matches, ODIs, T20s - all cricket formats discussed by passionate fans worldwide.',
        members: '145K',
        logo: 'https://logo.clearbit.com/icc-cricket.com',
        coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=300&fit=crop',
        category: 'sport'
      },
      {
        id: 6,
        name: 'Olympic Games',
        description: 'Celebrating Olympic sports, athletes and events from around the world.',
        members: '120K',
        logo: 'https://logo.clearbit.com/olympic.org',
        coverImage: 'https://alizila.oss-us-west-1.aliyuncs.com/uploads/2021/07/100-meters-sprint-olympics-rio-2016-shutterstock-992x558-1.jpg',
        category: 'sport'
      },
      {
        id: 7,
        name: 'Gaming Central',
        description: 'All things gaming - reviews, discussions, esports and gaming news.',
        members: '456K',
        logo: 'https://logo.clearbit.com/ign.com',
        coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=300&fit=crop',
        category: 'gaming'
      },
      {
        id: 8,
        name: 'PlayStation Nation',
        description: 'Sony PlayStation community for game discussions, reviews and exclusive content.',
        members: '298K',
        logo: 'https://logo.clearbit.com/playstation.com',
        coverImage: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=300&fit=crop',
        category: 'gaming'
      },
      {
        id: 9,
        name: 'Anime Enthusiasts',
        description: 'Anime discussions, reviews, fan art and all things otaku culture.',
        members: '789K',
        logo: 'https://logo.clearbit.com/crunchyroll.com',
        coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=300&fit=crop',
        category: 'entertainment'
      },
      {
        id: 10,
        name: 'Movie Buffs',
        description: 'Cinema discussions, movie reviews and film industry news.',
        members: '234K',
        logo: 'https://logo.clearbit.com/imdb.com',
        coverImage: 'https://images.unsplash.com/photo-1489599510041-0c5812f0d09d?w=800&h=300&fit=crop',
        category: 'entertainment'
      }
    ]
  }),

  getters: {
    // Get communities by category
    getCommunitiesByCategory: (state) => (category) => {
      return state.allCommunities.filter(community => community.category === category)
    },

    // Get community by ID
    getCommunityById: (state) => (id) => {
      return state.allCommunities.find(community => community.id === id)
    },

    // Get communities count by category
    getCommunitiesCountByCategory: (state) => (category) => {
      return state.allCommunities.filter(community => community.category === category).length
    },

    // Get total members count by category
    getTotalMembersByCategory: (state) => (category) => {
      const communities = state.allCommunities.filter(community => community.category === category)
      return communities.reduce((total, community) => {
        const memberCount = parseFloat(community.members.replace('K', '')) * 1000
        return total + memberCount
      }, 0)
    }
  },

  actions: {
    // Add new community
    addCommunity(community) {
      const newId = Math.max(...this.allCommunities.map(c => c.id)) + 1
      this.allCommunities.push({
        id: newId,
        ...community
      })
    },

    // Update community
    updateCommunity(id, updates) {
      const index = this.allCommunities.findIndex(community => community.id === id)
      if (index !== -1) {
        this.allCommunities[index] = { ...this.allCommunities[index], ...updates }
      }
    },

    // Join community (increment member count)
    joinCommunity(id) {
      const community = this.allCommunities.find(c => c.id === id)
      if (community) {
        const currentCount = parseFloat(community.members.replace('K', ''))
        const newCount = currentCount + 0.001 // Add 1 member (in K format)
        community.members = `${newCount.toFixed(1)}K`
      }
    },

    // Leave community (decrement member count)
    leaveCommunity(id) {
      const community = this.allCommunities.find(c => c.id === id)
      if (community) {
        const currentCount = parseFloat(community.members.replace('K', ''))
        const newCount = Math.max(0, currentCount - 0.001) // Remove 1 member (in K format)
        community.members = `${newCount.toFixed(1)}K`
      }
    }
  }
})
