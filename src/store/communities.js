import { defineStore } from 'pinia'

export const useCommunitiesStore = defineStore('communities', {
  state: () => ({
    // Browse page communities
    browseCommunities: [
      { 
        title: 'World News Network', 
        handle: 'world-news',
        description: 'Global news coverage and discussions about current events', 
        image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c7e9?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        memberCount: '1.8M', 
        postCount: '320K',
        onlineCount: '5.2K',
        fallbackColor: '#1a365d',
        tags: ['news', 'world', 'current events'],
        category: 'News'
      },
      { 
        title: 'Tech Today', 
        handle: 'tech-today',
        description: 'Latest technology news and gadget reviews', 
        image: 'https://www.intelligenthq.com/wp-content/uploads/2020/09/How-Tech-is-Changing-the-Way-we-Work.jpg', 
        avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
        memberCount: '1.2M', 
        postCount: '245K',
        onlineCount: '3.8K',
        fallbackColor: '#2d3748',
        tags: ['tech', 'gadgets', 'innovation'],
        category: 'News'
      },
      { 
        title: 'Business Insights', 
        handle: 'business',
        description: 'Financial markets, business trends and economic analysis', 
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        memberCount: '890K', 
        postCount: '156K',
        onlineCount: '2.7K',
        fallbackColor: '#4a5568',
        tags: ['business', 'finance', 'economy'],
        category: 'News'
      },
      { 
        title: 'Aesthetic', 
        handle: 'aesthetic',
        description: 'Beautiful visuals and artistic content from around the world', 
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        memberCount: '1.2M', 
        postCount: '245K',
        onlineCount: '3.4K',
        fallbackColor: '#8B4513',
        tags: ['art', 'photography', 'design'],
        category: 'Art'
      },
      { 
        title: 'Anime & Manga', 
        handle: 'anime',
        description: 'All things anime and manga - discussions, fan art, and more', 
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        memberCount: '980K', 
        postCount: '178K',
        onlineCount: '2.8K',
        fallbackColor: '#FF6B6B',
        tags: ['anime', 'manga', 'japan'],
        category: 'Gaming'
      },
      { 
        title: 'Digital Art', 
        handle: 'digital-art',
        description: 'Showcase your digital creations and get inspired by others', 
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        memberCount: '1.5M', 
        postCount: '320K',
        onlineCount: '4.1K',
        fallbackColor: '#95E1D3',
        tags: ['art', 'digital', 'illustration'],
        category: 'Art'
      },
      { 
        title: 'Community Spotlight', 
        handle: 'spotlight',
        description: 'Featured communities and creators worth checking out', 
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        memberCount: '245K', 
        postCount: '45K',
        onlineCount: '1.2K',
        fallbackColor: '#F38BA8',
        tags: ['featured', 'spotlight'],
        category: 'All'
      },
      { 
        title: 'Book Lovers', 
        handle: 'books',
        description: 'Reading recommendations and book discussions for all genres', 
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        memberCount: '756K', 
        postCount: '89K',
        onlineCount: '2.3K',
        fallbackColor: '#8B4513',
        tags: ['books', 'reading', 'literature'],
        category: 'Books'
      },
      { 
        title: 'World Cultures', 
        handle: 'cultures',
        description: 'Explore and discuss different cultures from around the globe', 
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        memberCount: '432K', 
        postCount: '67K',
        onlineCount: '1.5K',
        fallbackColor: '#4ECDC4',
        tags: ['culture', 'travel', 'world'],
        category: 'Culture'
      },
      { 
        title: 'Film Buffs', 
        handle: 'movies',
        description: 'Film reviews, movie discussions, and cinema appreciation', 
        image: 'https://images.unsplash.com/photo-1489599809467-6e5d9b55f80d?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
        memberCount: '678K', 
        postCount: '112K',
        onlineCount: '2.1K',
        fallbackColor: '#FFD93D',
        tags: ['movies', 'film', 'cinema'],
        category: 'Movies'
      },
      { 
        title: 'Music Discovery', 
        handle: 'music',
        description: 'Share and discover new music across all genres', 
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80', 
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        memberCount: '892K', 
        postCount: '156K',
        onlineCount: '3.2K',
        fallbackColor: '#6BCF7F',
        tags: ['music', 'discovery', 'artists'],
        category: 'Music'
      }
    ],

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
    // Browse communities getters
    getAllBrowseCommunities: (state) => state.browseCommunities,
    
    getBrowseCommunitiesByCategory: (state) => (category) => {
      if (category === 'All') return state.browseCommunities
      return state.browseCommunities.filter(community => 
        community.category === category ||
        (community.tags && community.tags.some(tag => 
          tag.toLowerCase().includes(category.toLowerCase())
        ))
      )
    },

    searchBrowseCommunities: (state) => (query) => {
      if (!query.trim()) return state.browseCommunities
      const searchQuery = query.toLowerCase()
      return state.browseCommunities.filter(community =>
        community.title.toLowerCase().includes(searchQuery) ||
        (community.description && community.description.toLowerCase().includes(searchQuery)) ||
        (community.tags && community.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
      )
    },

    filterBrowseCommunities: (state) => (query, category) => {
      let results = state.browseCommunities
      
      // Filter by search query
      if (query.trim()) {
        const searchQuery = query.toLowerCase()
        results = results.filter(c =>
          c.title.toLowerCase().includes(searchQuery) ||
          (c.description && c.description.toLowerCase().includes(searchQuery)) ||
          (c.tags && c.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
        )
      }
      
      // Filter by category
      if (category !== 'All') {
        results = results.filter(c => 
          c.category === category ||
          (c.tags && c.tags.some(tag => 
            tag.toLowerCase().includes(category.toLowerCase())
          ))
        )
      }
      
      return results
    },

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
    // Browse communities actions
    addBrowseCommunity(community) {
      this.browseCommunities.push(community)
    },

    updateBrowseCommunity(handle, updates) {
      const index = this.browseCommunities.findIndex(community => community.handle === handle)
      if (index !== -1) {
        this.browseCommunities[index] = { ...this.browseCommunities[index], ...updates }
      }
    },

    joinBrowseCommunity(handle) {
      const community = this.browseCommunities.find(c => c.handle === handle)
      if (community) {
        const currentCount = parseFloat(community.memberCount.replace(/[KM]/g, ''))
        const multiplier = community.memberCount.includes('M') ? 1000000 : 1000
        const newCount = currentCount * multiplier + 1
        
        if (newCount >= 1000000) {
          community.memberCount = `${(newCount / 1000000).toFixed(1)}M`
        } else {
          community.memberCount = `${(newCount / 1000).toFixed(1)}K`
        }
        
        // Update online count
        const onlineCount = parseFloat(community.onlineCount.replace('K', ''))
        community.onlineCount = `${(onlineCount + 0.001).toFixed(1)}K`
      }
    },

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
