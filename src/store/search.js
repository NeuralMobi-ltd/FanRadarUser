import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    recentSearches: ['Premier League', 'Anime', 'Marvel', 'K-Pop', 'Gaming'],
    trendingSearches: [
      { term: 'World Cup 2024', posts: '45.2K', category: 'Sports' },
      { term: 'New Anime Season', posts: '32.1K', category: 'Entertainment' },
      { term: 'MCU Phase 5', posts: '28.7K', category: 'Movies' },
      { term: 'K-Pop Comeback', posts: '24.3K', category: 'Music' },
      { term: 'PS5 Games', posts: '19.8K', category: 'Gaming' },
      { term: 'Netflix Series', posts: '17.5K', category: 'Entertainment' },
      { term: 'Tech News', posts: '15.2K', category: 'Technology' },
      { term: 'Fashion Week', posts: '12.9K', category: 'Fashion' }
    ],
    mockPeople: [
      {
        id: 1,
        name: 'Football Fanatic',
        username: 'footballfan',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        bio: 'Premier League enthusiast and sports analyst',
        followers: 12500,
        verified: true,
        isFollowing: false
      },
      {
        id: 2,
        name: 'Anime Expert',
        username: 'animeexpert',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        bio: 'Anime reviewer and manga collector',
        followers: 8900,
        verified: false,
        isFollowing: false
      },
      {
        id: 3,
        name: 'Marvel Master',
        username: 'marvelmaster',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        bio: 'MCU theories and comic book discussions',
        followers: 15600,
        verified: true,
        isFollowing: true
      },
      {
        id: 4,
        name: 'K-Pop Central',
        username: 'kpopcentralofficial',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        bio: 'Latest K-Pop news and updates',
        followers: 45000,
        verified: true,
        isFollowing: false
      },
      {
        id: 5,
        name: 'Gaming Guru',
        username: 'gamingguru',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        bio: 'Gaming reviews and industry news',
        followers: 23400,
        verified: true,
        isFollowing: false
      }
    ],
    mockPosts: [
      {
        id: 1,
        author: {
          id: 1,
          name: 'Football Fanatic',
          username: 'footballfan',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
          isVerified: true
        },
        content: 'What an incredible #PremierLeague match yesterday! The tactical setup was absolutely brilliant. The way they controlled the midfield was masterclass.',
        images: [],
        video: null,
        likes: 892,
        comments: 156,
        shares: 45,
        timeAgo: '2 hours ago',
        createdAt: '2024-01-15T10:00:00Z',
        hashtags: ['PremierLeague', 'Football', 'Tactics'],
        isLiked: false,
        isBookmarked: false,
        community: {
          name: 'Premier League Fans',
          handle: 'premier-league-fans'
        }
      },
      {
        id: 2,
        author: {
          id: 2,
          name: 'Sports Analyst',
          username: 'sportsanalyst',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          isVerified: false
        },
        content: 'Breaking down the #PremierLeague title race - statistics show it\'s closer than ever! My analysis of the top 6 teams performance.',
        images: [],
        video: null,
        likes: 1560,
        comments: 234,
        shares: 89,
        timeAgo: '4 hours ago',
        createdAt: '2024-01-15T06:00:00Z',
        hashtags: ['PremierLeague', 'Analysis', 'Statistics'],
        isLiked: false,
        isBookmarked: false,
        community: {
          name: 'Sports Analysis',
          handle: 'sports-analysis'
        }
      },
      {
        id: 3,
        author: {
          id: 3,
          name: 'Anime Expert',
          username: 'animeexpert',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          isVerified: false
        },
        content: 'Just finished the latest #Anime episode and I\'m speechless! The animation quality this season is phenomenal. Studio really outdid themselves.',
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop'],
        video: null,
        likes: 2340,
        comments: 567,
        shares: 123,
        timeAgo: '6 hours ago',
        createdAt: '2024-01-15T04:00:00Z',
        hashtags: ['Anime', 'Animation', 'Review'],
        isLiked: true,
        isBookmarked: false,
        community: {
          name: 'Anime & Manga',
          handle: 'anime-manga'
        }
      },
      {
        id: 4,
        author: {
          id: 4,
          name: 'Marvel Master',
          username: 'marvelmaster',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          isVerified: true
        },
        content: 'New #Marvel theory: What if the multiverse we saw is just the beginning? I think Phase 5 will blow our minds with these connections.',
        images: [],
        video: null,
        likes: 3450,
        comments: 890,
        shares: 234,
        timeAgo: '8 hours ago',
        createdAt: '2024-01-15T02:00:00Z',
        hashtags: ['Marvel', 'MCU', 'Theory', 'Multiverse'],
        isLiked: false,
        isBookmarked: true,
        community: {
          name: 'Marvel Multiverse',
          handle: 'marvel-multiverse'
        }
      },
      {
        id: 5,
        author: {
          id: 5,
          name: 'K-Pop Central',
          username: 'kpopcentralofficial',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
          isVerified: true
        },
        content: 'BREAKING: New #KPop comeback announced! The choreography preview looks amazing. Can\'t wait for the full MV release next week!',
        images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop'],
        video: null,
        likes: 12500,
        comments: 2340,
        shares: 890,
        timeAgo: '1 hour ago',
        createdAt: '2024-01-15T11:00:00Z',
        hashtags: ['KPop', 'Comeback', 'MV', 'Choreography'],
        isLiked: true,
        isBookmarked: false,
        community: {
          name: 'K-Pop Central',
          handle: 'kpop-central'
        }
      }
    ],
    mockNews: [
      {
        id: 1,
        title: 'Premier League Transfer Window: Major Signings and Surprises',
        summary: 'Latest transfers and rumors from across the Premier League clubs this summer. Record-breaking deals shake up the league.',
        content: 'The Premier League transfer window has been one of the most exciting in recent memory...',
        image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=300&h=200&fit=crop',
        source: 'Sports News Daily',
        author: 'Sports Desk',
        timeAgo: '1 hour ago',
        publishedAt: '2024-01-15T11:00:00Z',
        category: 'Sports',
        tags: ['Premier League', 'Transfers', 'Football'],
        readTime: '3 min read',
        url: '/news/premier-league-transfers'
      },
      {
        id: 2,
        title: 'Anime Industry Reaches New Heights with Record Streaming Numbers',
        summary: 'Expert predictions and analysis for the upcoming anime season. Streaming platforms report massive growth.',
        content: 'The anime industry continues to break records as streaming numbers reach unprecedented levels...',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
        source: 'Anime News Network',
        author: 'Entertainment Team',
        timeAgo: '3 hours ago',
        publishedAt: '2024-01-15T09:00:00Z',
        category: 'Entertainment',
        tags: ['Anime', 'Streaming', 'Industry'],
        readTime: '5 min read',
        url: '/news/anime-streaming-growth'
      },
      {
        id: 3,
        title: 'Marvel Studios Announces Phase 5 Timeline and New Characters',
        summary: 'Kevin Feige reveals the roadmap for MCU Phase 5 with surprising character introductions and crossover events.',
        content: 'Marvel Studios president Kevin Feige announced the complete timeline for Phase 5...',
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=200&fit=crop',
        source: 'Entertainment Weekly',
        author: 'Marvel Correspondent',
        timeAgo: '5 hours ago',
        publishedAt: '2024-01-15T07:00:00Z',
        category: 'Movies',
        tags: ['Marvel', 'MCU', 'Phase 5', 'Movies'],
        readTime: '4 min read',
        url: '/news/marvel-phase-5'
      },
      {
        id: 4,
        title: 'K-Pop Global Influence: Breaking Billboard Records Again',
        summary: 'Korean pop music continues to dominate international charts with multiple groups achieving milestone achievements.',
        content: 'The global influence of K-Pop has reached new heights as multiple Korean groups...',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
        source: 'Music Industry Reports',
        author: 'Music Desk',
        timeAgo: '7 hours ago',
        publishedAt: '2024-01-15T05:00:00Z',
        category: 'Music',
        tags: ['K-Pop', 'Billboard', 'Music', 'Charts'],
        readTime: '6 min read',
        url: '/news/kpop-billboard-records'
      },
      {
        id: 5,
        title: 'Gaming Industry Revenue Hits Record High in 2024',
        summary: 'Video game industry sees unprecedented growth with mobile gaming leading the charge and new console releases.',
        content: 'The gaming industry has achieved record-breaking revenue in 2024...',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
        source: 'Gaming Business News',
        author: 'Industry Analyst',
        timeAgo: '12 hours ago',
        publishedAt: '2024-01-15T00:00:00Z',
        category: 'Gaming',
        tags: ['Gaming', 'Industry', 'Revenue', 'Mobile'],
        readTime: '7 min read',
        url: '/news/gaming-revenue-2024'
      }
    ],
    mockFandoms: [
      {
        id: 1,
        name: 'Premier League Fans',
        handle: 'premier-league-fans',
        description: 'The ultimate fandom for Premier League football fans. Match discussions, transfer news, and tactical analysis.',
        logo: 'https://logo.clearbit.com/premierleague.com',
        coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=300&fit=crop',
        members: '234K',
        memberCount: 234000,
        category: 'Sports',
        posts: '12.5K',
        postCount: 12500,
        isJoined: false,
        isPrivate: false,
        createdAt: '2023-01-15T00:00:00Z',
        hashtags: ['PremierLeague', 'Football', 'EPL'],
        rules: ['Be respectful', 'No spam', 'Stay on topic'],
        moderators: ['footballfan', 'sportsanalyst']
      },
      {
        id: 2,
        name: 'Anime & Manga Hub',
        handle: 'anime-manga-hub',
        description: 'All things anime and manga - discussions, reviews, fan art, and recommendations for otaku culture.',
        logo: 'https://logo.clearbit.com/crunchyroll.com',
        coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=300&fit=crop',
        members: '980K',
        memberCount: 980000,
        category: 'Entertainment',
        posts: '45.2K',
        postCount: 45200,
        isJoined: true,
        isPrivate: false,
        createdAt: '2022-08-20T00:00:00Z',
        hashtags: ['Anime', 'Manga', 'Otaku'],
        rules: ['No spoilers without tags', 'Be respectful', 'Original content welcome'],
        moderators: ['animeexpert', 'mangafan']
      },
      {
        id: 3,
        name: 'Marvel Multiverse',
        handle: 'marvel-multiverse',
        description: 'Marvel movies, comics, theories and everything MCU. Join discussions about your favorite superheroes.',
        logo: 'https://logo.clearbit.com/marvel.com',
        coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=300&fit=crop',
        members: '1.2M',
        memberCount: 1200000,
        category: 'Entertainment',
        posts: '67.8K',
        postCount: 67800,
        isJoined: true,
        isPrivate: false,
        createdAt: '2022-01-10T00:00:00Z',
        hashtags: ['Marvel', 'MCU', 'Comics'],
        rules: ['No hate speech', 'Keep it civil', 'Spoilers must be tagged'],
        moderators: ['marvelmaster', 'comicfan']
      },
      {
        id: 4,
        name: 'K-Pop Central',
        handle: 'kpop-central',
        description: 'Latest K-Pop news, comebacks, fan discussions, and everything about Korean pop music culture.',
        logo: 'https://logo.clearbit.com/soompi.com',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop',
        members: '890K',
        memberCount: 890000,
        category: 'Music',
        posts: '89.3K',
        postCount: 89300,
        isJoined: false,
        isPrivate: false,
        createdAt: '2023-05-05T00:00:00Z',
        hashtags: ['KPop', 'Korean', 'Music'],
        rules: ['Be respectful to artists', 'No fan wars', 'Use spoilers tags for new content'],
        moderators: ['kpopcentralofficial', 'musiclover']
      },
      {
        id: 5,
        name: 'Gaming Universe',
        handle: 'gaming-universe',
        description: 'Gaming news, reviews, discussions about PC, console, and mobile games. All gamers welcome!',
        logo: 'https://logo.clearbit.com/ign.com',
        coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=300&fit=crop',
        members: '756K',
        memberCount: 756000,
        category: 'Gaming',
        posts: '34.7K',
        postCount: 34700,
        isJoined: false,
        isPrivate: false,
        createdAt: '2023-03-15T00:00:00Z',
        hashtags: ['Gaming', 'VideoGames', 'Esports'],
        rules: ['No cheating', 'Be respectful', 'English only'],
        moderators: ['gamingguru', 'esportsfan']
      },
      {
        id: 6,
        name: 'Tech Innovators',
        handle: 'tech-innovators',
        description: 'Latest tech trends, startup news, innovation discussions, and everything technology-related.',
        logo: 'https://logo.clearbit.com/techcrunch.com',
        coverImage: 'https://images.unsplash.com/photo-1581091870620-4b8f7e6e6f3f?w=800&h=300&fit=crop',
        members: '567K',
        memberCount: 567000,
        category: 'Technology',
        posts: '23.1K',
        postCount: 23100,
        isJoined: true,
        isPrivate: false,
        createdAt: '2022-12-01T00:00:00Z',
        hashtags: ['Tech', 'Innovation', 'Startups'],
        rules: ['No self-promotion', 'Stay on topic', 'Respect privacy'],
        moderators: ['techenthusiast', 'startupguru']
      }
    ]
  }),

  actions: {
    addToRecentSearches(searchTerm) {
      // Remove if already exists
      this.recentSearches = this.recentSearches.filter(term => term !== searchTerm)
      // Add to beginning
      this.recentSearches.unshift(searchTerm)
      // Keep only last 10 searches
      this.recentSearches = this.recentSearches.slice(0, 10)
    },

    removeRecentSearch(searchTerm) {
      this.recentSearches = this.recentSearches.filter(term => term !== searchTerm)
    },

    clearRecentSearches() {
      this.recentSearches = []
    },

    searchPeople(query) {
      if (!query) return []
      const searchTerm = query.toLowerCase()
      return this.mockPeople.filter(person =>
        person.name.toLowerCase().includes(searchTerm) ||
        person.username.toLowerCase().includes(searchTerm) ||
        person.bio.toLowerCase().includes(searchTerm)
      )
    },

    searchPosts(query) {
      if (!query) return []
      const searchTerm = query.toLowerCase()
      return this.mockPosts.filter(post =>
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.name.toLowerCase().includes(searchTerm) ||
        post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    },

    searchNews(query) {
      if (!query) return []
      const searchTerm = query.toLowerCase()
      return this.mockNews.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.summary.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    },

    searchFandoms(query) {
      if (!query) return []
      const searchTerm = query.toLowerCase()
      return this.mockFandoms.filter(fandom =>
        fandom.name.toLowerCase().includes(searchTerm) ||
        fandom.description.toLowerCase().includes(searchTerm) ||
        fandom.hashtags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    },

    performGlobalSearch(query) {
      if (!query) {
        return {
          people: [],
          posts: [],
          news: [],
          fandoms: []
        }
      }

      return {
        people: this.searchPeople(query),
        posts: this.searchPosts(query),
        news: this.searchNews(query),
        fandoms: this.searchFandoms(query)
      }
    }
  },

  getters: {
    getTrendingByCategory: (state) => (category) => {
      return state.trendingSearches.filter(trend => trend.category === category)
    },

    getRecentSearches: (state) => state.recentSearches,

    getTotalResults: (state) => (query) => {
      const results = state.performGlobalSearch(query)
      return results.people.length + results.posts.length + results.news.length + results.fandoms.length
    }
  }
})
