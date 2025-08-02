import { defineStore } from 'pinia'

export const useFandomsStore = defineStore('fandoms', {
  state: () => ({
    userFandoms: [
      // Mock fandoms user is admin/member of
      {
        id: 1,
        name: 'Premier League Fans',
        handle: 'premier-league-fans',
        description: 'The ultimate community for Premier League football fans',
        members: '234K',
        role: 'admin',
        createdAt: '2023-01-15',
        coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=300&fit=crop',
        logo: 'https://logo.clearbit.com/premierleague.com',
        category: 'Sports',
        hashtags: [
          { tag: 'PremierLeague', posts: '45.2K' },
          { tag: 'Football', posts: '128K' },
          { tag: 'Soccer', posts: '89.5K' },
          { tag: 'EPL', posts: '23.8K' },
          { tag: 'MatchDay', posts: '67.3K' },
          { tag: 'Transfer', posts: '34.1K' }
        ]
      },
      {
        id: 2,
        name: 'Anime & Manga',
        handle: 'anime-manga',
        description: 'All things anime and manga - discussions, fan art, and more',
        members: '980K',
        role: 'admin',
        createdAt: '2022-08-20',
        coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=300&fit=crop',
        logo: 'https://logo.clearbit.com/crunchyroll.com',
        category: 'Entertainment',
        hashtags: [
          { tag: 'Anime', posts: '234K' },
          { tag: 'Manga', posts: '156K' },
          { tag: 'Otaku', posts: '89.7K' },
          { tag: 'AnimeReview', posts: '45.2K' },
          { tag: 'AnimeFan', posts: '67.8K' },
          { tag: 'Shounen', posts: '123K' }
        ]
      },
      {
        id: 3,
        name: 'Tech Innovators',
        handle: 'tech-innovators',
        description: 'Latest tech trends, startup news, and innovation discussions',
        members: '567K',
        role: 'admin',
        createdAt: '2023-03-10',
        coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=300&fit=crop',
        logo: 'https://logo.clearbit.com/techcrunch.com',
        category: 'Technology',
        hashtags: [
          { tag: 'TechNews', posts: '45.2K' },
          { tag: 'Innovation', posts: '32.1K' },
          { tag: 'Startup', posts: '28.7K' },
          { tag: 'AI', posts: '56.3K' },
          { tag: 'Gadgets', posts: '19.8K' }
        ]
      },
      {
        id: 4,
        name: 'Marvel Multiverse',
        handle: 'marvel-multiverse',
        description: 'Marvel movies, comics, theories and everything MCU',
        members: '1.2M',
        role: 'member',
        joinedAt: '2023-05-12',
        coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=300&fit=crop',
        logo: 'https://logo.clearbit.com/marvel.com',
        category: 'Entertainment',
        hashtags: [
          { tag: 'MCU', posts: '128K' },
          { tag: 'MarvelComics', posts: '89.5K' },
          { tag: 'Avengers', posts: '156K' },
          { tag: 'SpiderMan', posts: '67.2K' },
          { tag: 'XMen', posts: '43.8K' },
          { tag: 'MarvelTheory', posts: '78.1K' }
        ]
      },
      {
        id: 5,
        name: 'K-Pop Central',
        handle: 'kpop-central',
        description: 'Latest K-Pop news, comebacks, and fan discussions',
        members: '890K',
        role: 'member',
        joinedAt: '2023-07-08',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop',
        logo: 'https://logo.clearbit.com/soompi.com',
        category: 'Music',
        hashtags: [
          { tag: 'KPop', posts: '234K' },
          { tag: 'BTS', posts: '189K' },
          { tag: 'BLACKPINK', posts: '167K' },
          { tag: 'NewJeans', posts: '145K' },
          { tag: 'Comeback', posts: '98.7K' },
          { tag: 'KPopNews', posts: '76.3K' }
        ]
      }
    ],
    userRoles: {
      'premier-league-fans': 'admin',
      'anime-manga': 'admin', 
      'tech-innovators': 'admin',
      'marvel-multiverse': 'member',
      'kpop-central': 'member',
      'anime': 'member',
      'digital-art': 'member'
    },
    allFandoms: [], // All available fandoms
    trendingFandoms: [], // Currently trending fandoms
    userJoinRequests: [], // Pending join requests
    userNotifications: [], // Fandom-related notifications
    userActivity: [], // User activity history in fandoms
    bookmarkedFandoms: [], // User's bookmarked/favorite fandoms
    recentlyVisited: [] // Recently visited fandoms
  }),
  
  actions: {
    setUserRole(fandomHandle, role) {
      this.userRoles[fandomHandle] = role
    },
    
    addUserFandom(fandom) {
      if (!this.userFandoms.find(f => f.id === fandom.id)) {
        this.userFandoms.push(fandom)
      }
    },
    
    removeUserFandom(fandomId) {
      this.userFandoms = this.userFandoms.filter(f => f.id !== fandomId)
      delete this.userRoles[fandomId]
    }
  },
  
  getters: {
    isAdmin: (state) => (fandomHandle) => {
      if (!fandomHandle) return false
      return state.userRoles[fandomHandle] === 'admin'
    },
    isMember: (state) => (fandomHandle) => {
      if (!fandomHandle) return false
      return !!state.userRoles[fandomHandle]
    },
    getUserRole: (state) => (fandomHandle) => {
      if (!fandomHandle) return null
      return state.userRoles[fandomHandle] || null
    },
    adminFandoms: (state) => state.userFandoms.filter(fandom => fandom.role === 'admin'),
    memberFandoms: (state) => state.userFandoms.filter(fandom => fandom.role === 'member'),
    fandomCount: (state) => state.userFandoms.length
  }
})
