import { defineStore } from 'pinia'
// Replace constants helper with config media util
import { getCategoryImage } from '@/config/media'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsItems: [
      {
        id: 1,
        source: 'Esports Today',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'BTS remporte 3 prix aux MTV Awards 2024',
        summary: 'Le groupe sud-coréen continue de dominer la scène musicale internationale.',
        description: 'BTS a remporté trois prix majeurs lors de la cérémonie des MTV Awards 2024, confirmant leur statut de superstars mondiales.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
        date: '2h ago',
        timeAgo: '2h ago',
        views: 28500,
        likes: 45200,
        comments: 8100,
        category: 'K-pop',
        isNew: true,
        isLiked: false,
        breaking: true
      },
      {
        id: 2,
        source: 'Football News',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'Real Madrid vs Barcelona: El Clasico Preview',
        summary: 'Analysis and predictions for the most anticipated match of the season.',
        description: 'Complete preview of El Clasico with team lineups, key players to watch, and tactical analysis.',
        image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=200&h=200&fit=crop',
        date: '4h ago',
        timeAgo: '4h ago',
        views: 15300,
        likes: 890,
        comments: 234,
        category: 'Football',
        isNew: false,
        isLiked: false
      },
      {
        id: 3,
        source: 'Anime Central',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'Attack on Titan Final Movie Date Revealed',
        summary: 'Studio announces official release date for the epic finale.',
        description: 'Studio Wit révèle la date de sortie officielle du film final d\'Attack on Titan, promettant une conclusion épique.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
        date: '6h ago',
        timeAgo: '6h ago',
        views: 45700,
        likes: 3200,
        comments: 567,
        category: 'Anime',
        isNew: true,
        isLiked: false
      },
      {
        id: 4,
        source: 'Gaming Weekly',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'League of Legends World Championship 2024',
        summary: 'Teams prepare for the biggest esports event of the year.',
        description: 'Couverture complète des Worlds 2024 de LoL avec analyse des équipes, prévisions et détails sur le format du tournoi.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
        date: '8h ago',
        timeAgo: '8h ago',
        views: 67200,
        likes: 4500,
        comments: 1200,
        category: 'Gaming',
        isNew: false,
        isLiked: true
      },
      {
        id: 5,
        source: 'Music Today',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'Taylor Swift Announces New Album',
        summary: 'Pop superstar reveals surprise album drop date.',
        description: 'Taylor Swift surprises fans with announcement of new album featuring collaborations with top artists.',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        date: '12h ago',
        timeAgo: '12h ago',
        views: 89400,
        likes: 7300,
        comments: 2100,
        category: 'Music',
        isNew: true,
        isLiked: false
      },
      {
        id: 6,
        source: 'Cinema Insider',
        sourceLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh0WlsRbXVcu8pEm_2mW4elXckoAGaz1KIGQ&s',
        title: 'Marvel Phase 5: New Heroes Revealed',
        summary: 'Disney unveils next generation of MCU characters.',
        description: 'Marvel Studios reveals new superheroes joining Phase 5 with exclusive interviews and behind-the-scenes footage.',
        image: 'https://images.unsplash.com/photo-1489599510041-0c5812f0d09d?w=200&h=200&fit=crop',
        date: '1d ago',
        timeAgo: '1d ago',
        views: 156000,
        likes: 12400,
        comments: 3400,
        category: 'Movies',
        isNew: false,
        isLiked: false
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
          summary: 'Expert analysis and predictions for the biggest match in European football.',
          description: 'Expert analysis and predictions for the biggest match in European football. Team lineups, key players to watch, and tactical breakdowns.',
          image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=200&h=200&fit=crop',
          date: '2h ago',
          timeAgo: '2h ago',
          views: 12400,
          likes: 890,
          category: 'Football',
          readingTime: '5',
          isLiked: false,
          isNew: true,
          breaking: true
        },
        {
          id: 502,
          source: 'NBA Network',
          sourceLogo: 'https://logo.clearbit.com/nba.com',
          title: 'NBA Playoffs Drama Continues',
          summary: 'Heated discussions about the ongoing playoff series and MVP candidates.',
          description: 'Heated discussions about the ongoing playoff series, MVP candidates, and game-changing moments that are defining this season.',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop',
          date: '4h ago',
          timeAgo: '4h ago',
          views: 8700,
          likes: 650,
          category: 'Basketball',
          readingTime: '4',
          isLiked: false,
          isNew: false
        },
        {
          id: 503,
          source: 'Tennis World',
          sourceLogo: 'https://logo.clearbit.com/atptour.com',
          title: 'Wimbledon Championship Update',
          summary: 'Tennis fans analyzing draw predictions and discussing past champions.',
          description: 'Tennis fans analyzing draw predictions, discussing past champions and rising stars in the tournament.',
          image: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=200&h=200&fit=crop',
          date: '6h ago',
          timeAgo: '6h ago',
          views: 6200,
          likes: 420,
          category: 'Tennis',
          readingTime: '3',
          isLiked: false,
          isNew: false
        }
      ],
      gaming: [
        {
          id: 601,
          source: 'Game Insider',
          sourceLogo: 'https://logo.clearbit.com/ign.com',
          title: 'League of Legends World Championship',
          summary: 'Epic showdown between the world\'s best teams with live coverage.',
          description: 'Epic showdown between the world\'s best teams. Live coverage, player interviews, and expert analysis of the biggest esports event.',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop',
          date: '1h ago',
          timeAgo: '1h ago',
          views: 25300,
          likes: 1890,
          category: 'Esports',
          readingTime: '6',
          isLiked: false,
          isNew: true,
          trending: true
        },
        {
          id: 602,
          source: 'PlayStation Blog',
          sourceLogo: 'https://logo.clearbit.com/playstation.com',
          title: 'New PlayStation 5 Games Announced',
          summary: 'Sony reveals exclusive titles coming to PS5 including highly anticipated sequels.',
          description: 'Sony reveals exclusive titles coming to PS5 including highly anticipated sequels and new IPs that will revolutionize gaming.',
          image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop',
          date: '3h ago',
          timeAgo: '3h ago',
          views: 18900,
          likes: 1340,
          category: 'Console Gaming',
          readingTime: '5',
          isLiked: false,
          isNew: true
        }
      ],
      entertainment: [
        {
          id: 701,
          source: 'Anime Central',
          sourceLogo: 'https://logo.clearbit.com/crunchyroll.com',
          title: 'Attack on Titan Final Season',
          summary: 'The epic conclusion to the beloved anime series with stunning animation.',
          description: 'The epic conclusion to the beloved anime series with stunning animation and emotional storytelling.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
          date: '2h ago',
          timeAgo: '2h ago',
          views: 34500,
          likes: 2890,
          category: 'Anime',
          readingTime: '4',
          isLiked: false,
          isNew: true
        },
        {
          id: 702,
          source: 'Entertainment Weekly',
          sourceLogo: 'https://logo.clearbit.com/ew.com',
          title: 'Marvel Phase 5 Announcement',
          summary: 'New superhero movies and series announced for the next MCU phase.',
          description: 'New superhero movies and series announced for the next phase of the Marvel Cinematic Universe.',
          image: 'https://images.unsplash.com/photo-1489599510041-0c5812f0d09d?w=200&h=200&fit=crop',
          date: '5h ago',
          timeAgo: '5h ago',
          views: 28700,
          likes: 2150,
          category: 'Movies',
          readingTime: '6',
          isLiked: false,
          isNew: false
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
        date: new Date(),
        timeAgo: 'Just now',
        views: 0,
        likes: 0,
        isLiked: false,
        isNew: true
      }
      this.newsItems.unshift(newNews)
    },
    
    updateViews(newsId) {
      const news = this.newsItems.find(item => item.id === newsId)
      if (news && typeof news.views === 'number') {
        news.views += 1
      }
      
      // Also check category news
      Object.values(this.categoryNews).forEach(categoryItems => {
        const categoryNews = categoryItems.find(item => item.id === newsId)
        if (categoryNews && typeof categoryNews.views === 'number') {
          categoryNews.views += 1
        }
      })
    },
    
    toggleLike(newsId) {
      const news = this.newsItems.find(item => item.id === newsId)
      if (news) {
        news.isLiked = !news.isLiked
        if (news.isLiked) {
          news.likes += 1
        } else {
          news.likes = Math.max(0, news.likes - 1)
        }
      }
      
      // Also check category news
      Object.values(this.categoryNews).forEach(categoryItems => {
        const categoryNews = categoryItems.find(item => item.id === newsId)
        if (categoryNews) {
          categoryNews.isLiked = !categoryNews.isLiked
          if (categoryNews.isLiked) {
            categoryNews.likes += 1
          } else {
            categoryNews.likes = Math.max(0, categoryNews.likes - 1)
          }
        }
      })
    }
  }
})
