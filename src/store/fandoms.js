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
    recentlyVisited: [], // Recently visited fandoms
    
    // Fandom posts data
    fandomPosts: {
      'premier-league-fans': [
        {
          id: 1,
          username: 'FootballFanatic',
          userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          date: '2h ago',
          communityName: '',
          content: 'What a match yesterday! The tactical setup was absolutely brilliant. The way they pressed high and created chances was textbook football.',
          image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop',
          tags: ['match', 'tactics', 'analysis'],
          likes: 89,
          comments: 23,
          shares: 5,
          isLiked: false,
          fandom: ''
        },
        {
          id: 2,
          username: 'TacticalGenius',
          userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          date: '5h ago',
          communityName: '',
          content: 'Breaking down the formation changes in the second half. The manager\'s substitutions completely changed the game dynamic.',
          tags: ['tactics', 'formation', 'substitutions'],
          likes: 156,
          comments: 34,
          shares: 12,
          isLiked: true,
          fandom: ''
        }
      ]
    },
    
    // Fandom members data
    fandomMembers: {
      'premier-league-fans': [
        {
          id: 1,
          name: 'John Smith',
          username: 'johnsmith',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          role: 'admin',
          posts: 245,
          joinedDate: 'Jan 2019'
        },
        {
          id: 2,
          name: 'Emma Wilson',
          username: 'emmaw',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          role: 'moderator',
          posts: 189,
          joinedDate: 'Mar 2020'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          username: 'mikej',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
          role: 'member',
          posts: 67,
          joinedDate: 'Aug 2021'
        },
        {
          id: 4,
          name: 'Sarah Davis',
          username: 'sarahd',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
          role: 'member',
          posts: 123,
          joinedDate: 'Feb 2022'
        }
      ]
    }
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
    },

    // Fandom posts actions
    addFandomPost(fandomHandle, post) {
      if (!this.fandomPosts[fandomHandle]) {
        this.fandomPosts[fandomHandle] = []
      }
      this.fandomPosts[fandomHandle].unshift(post)
    },

    deleteFandomPost(fandomHandle, postId) {
      if (this.fandomPosts[fandomHandle]) {
        this.fandomPosts[fandomHandle] = this.fandomPosts[fandomHandle].filter(p => p.id !== postId)
      }
    },

    likeFandomPost(fandomHandle, postId) {
      if (this.fandomPosts[fandomHandle]) {
        const post = this.fandomPosts[fandomHandle].find(p => p.id === postId)
        if (post) {
          post.isLiked = !post.isLiked
          post.likes += post.isLiked ? 1 : -1
        }
      }
    },

    // Fandom members actions
    addFandomMember(fandomHandle, member) {
      if (!this.fandomMembers[fandomHandle]) {
        this.fandomMembers[fandomHandle] = []
      }
      this.fandomMembers[fandomHandle].push(member)
    },

    removeFandomMember(fandomHandle, memberId) {
      if (this.fandomMembers[fandomHandle]) {
        this.fandomMembers[fandomHandle] = this.fandomMembers[fandomHandle].filter(m => m.id !== memberId)
      }
    },

    changeFandomMemberRole(fandomHandle, memberId, newRole) {
      if (this.fandomMembers[fandomHandle]) {
        const member = this.fandomMembers[fandomHandle].find(m => m.id === memberId)
        if (member) {
          member.role = newRole
        }
      }
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
    fandomCount: (state) => state.userFandoms.length,

    // Fandom posts getters
    getFandomPosts: (state) => (fandomHandle) => {
      return state.fandomPosts[fandomHandle] || []
    },

    getFandomPostsCount: (state) => (fandomHandle) => {
      return state.fandomPosts[fandomHandle]?.length || 0
    },

    // Fandom members getters
    getFandomMembers: (state) => (fandomHandle) => {
      return state.fandomMembers[fandomHandle] || []
    },

    getFandomMembersCount: (state) => (fandomHandle) => {
      return state.fandomMembers[fandomHandle]?.length || 0
    },

    searchFandomMembers: (state) => (fandomHandle, query) => {
      const members = state.fandomMembers[fandomHandle] || []
      if (!query) return members
      return members.filter(member => 
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.username.toLowerCase().includes(query.toLowerCase())
      )
    }
  }
})
