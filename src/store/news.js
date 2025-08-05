import { defineStore } from 'pinia'
import { getCategoryImage } from '@/constants/categoryImages'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsItems: [
      {
        id: 1,
        source: 'Esports Today',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'League of Legends World Championship 2024',
        summary: 'Les équipes se préparent pour l\'événement esports le plus attendu de l\'année. T1 défendra son titre face aux challengers européens et chinois.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=300&fit=crop',
        date: '2h ago',
        views: '28.5K',
        breaking: true
      },
      {
        id: 2,
        source: 'Football News',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'Tensions sur les pénalties en Ligue des Champions',
        summary: 'Les dernières controversies sur les décisions arbitrales en phase finale alimentent les débats entre supporters.',
        image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=300&fit=crop',
        date: '6h ago',
        views: '12.3K'
      },
      {
        id: 3,
        source: 'Anime Central',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'Attack on Titan Final Movie Announced',
        summary: 'Studio Wit annonce un film final pour conclure définitivement la saga d\'Eren Yeager.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop',
        date: new Date(Date.now() - 3600000 * 8),
        views: '45.7K'
      },
      {
        id: 4,
        source: 'K-Pop Weekly',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'NewJeans Breaks Spotify Records',
        summary: 'Le groupe continue de dominer les charts internationaux avec leur nouvel album.',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=300&fit=crop',
        date: new Date(Date.now() - 3600000 * 12),
        views: '67.2K'
      }
    ],

    // Category-specific news for CategoryDetail pages
    categoryNews: {
      sport: [
        {
          id: 501,
          source: 'Sports Today',
          sourceLogo: 'https://logo.clearbit.com/espn.com',
          title: 'Champions League Final Preview',
          summary: 'Expert analysis and predictions for the biggest match in European football. Team lineups, key players to watch, and tactical breakdowns.',
          image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop',
          date: '2h ago',
          views: '12.4K',
          category: 'Football',
          readingTime: '5',
          isLiked: false,
          breaking: true
        },
        {
          id: 502,
          source: 'NBA Network',
          sourceLogo: 'https://logo.clearbit.com/nba.com',
          title: 'NBA Playoffs Drama Continues',
          summary: 'Heated discussions about the ongoing playoff series, MVP candidates, and game-changing moments that are defining this season.',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop',
          date: '4h ago',
          views: '8.7K',
          category: 'Basketball',
          readingTime: '4',
          isLiked: false
        },
        {
          id: 503,
          source: 'Tennis World',
          sourceLogo: 'https://logo.clearbit.com/atptour.com',
          title: 'Wimbledon Championship Update',
          summary: 'Tennis fans analyzing draw predictions, discussing past champions and rising stars in the tournament.',
          image: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=500&fit=crop',
          date: '6h ago',
          views: '6.2K',
          category: 'Tennis',
          readingTime: '3',
          isLiked: false
        }
      ],
      gaming: [
        {
          id: 601,
          source: 'Game Insider',
          sourceLogo: 'https://logo.clearbit.com/ign.com',
          title: 'League of Legends World Championship',
          summary: 'Epic showdown between the world\'s best teams. Live coverage, player interviews, and expert analysis of the biggest esports event.',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
          date: '1h ago',
          views: '25.3K',
          category: 'Esports',
          readingTime: '6',
          isLiked: false,
          trending: true
        },
        {
          id: 602,
          source: 'PlayStation Blog',
          sourceLogo: 'https://logo.clearbit.com/playstation.com',
          title: 'New PlayStation 5 Games Announced',
          summary: 'Sony reveals exclusive titles coming to PS5 including highly anticipated sequels and new IPs that will revolutionize gaming.',
          image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=500&fit=crop',
          date: '3h ago',
          views: '18.9K',
          category: 'Console Gaming',
          readingTime: '5',
          isLiked: false
        }
      ],
      entertainment: [
        {
          id: 701,
          source: 'Anime Central',
          sourceLogo: 'https://logo.clearbit.com/crunchyroll.com',
          title: 'Attack on Titan Final Season',
          summary: 'The epic conclusion to the beloved anime series with stunning animation and emotional storytelling.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
          date: '2h ago',
          views: '34.5K',
          category: 'Anime',
          readingTime: '4',
          isLiked: false
        },
        {
          id: 702,
          source: 'Entertainment Weekly',
          sourceLogo: 'https://logo.clearbit.com/ew.com',
          title: 'Marvel Phase 5 Announcement',
          summary: 'New superhero movies and series announced for the next phase of the Marvel Cinematic Universe.',
          image: 'https://images.unsplash.com/photo-1489599510041-0c5812f0d09d?w=800&h=500&fit=crop',
          date: '5h ago',
          views: '28.7K',
          category: 'Movies',
          readingTime: '6',
          isLiked: false
        }
      ]
    }
  }),
  
  getters: {
    breakingNews: (state) => state.newsItems.filter(news => news.breaking),
    recentNews: (state) => state.newsItems.sort((a, b) => {
      const dateA = typeof a.date === 'string' ? new Date() : a.date
      const dateB = typeof b.date === 'string' ? new Date() : b.date
      return dateB - dateA
    }),
    
    // Get news by category for CategoryDetail pages
    getNewsByCategory: (state) => (category) => {
      return state.categoryNews[category] || []
    },
    
    // Generate default news for categories without specific data
    getDefaultNewsForCategory: (state) => (category, formattedName) => {
      return [
        {
          id: 999,
          source: formattedName,
          sourceLogo: `https://logo.clearbit.com/${category}.com`,
          title: `Latest ${formattedName} News`,
          summary: `Breaking news and updates from the ${category} community. Stay informed with the latest developments.`,
          image: getCategoryImage(category),
          date: '3h ago',
          views: '15.2K',
          category: formattedName,
          readingTime: '4',
          isLiked: false
        }
      ]
    }
  },
  
  actions: {
    addNews(news) {
      const newNews = {
        id: Date.now(),
        ...news,
        date: new Date()
      }
      this.newsItems.unshift(newNews)
    },
    
    updateViews(newsId) {
      const news = this.newsItems.find(item => item.id === newsId)
      if (news) {
        const viewsNum = parseFloat(news.views.replace('K', '')) * 1000
        news.views = `${(viewsNum + 1) / 1000}K`
      }
    }
  }
})
