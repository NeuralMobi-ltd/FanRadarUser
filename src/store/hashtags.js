import { defineStore } from 'pinia'
import { getHashtagImage } from '@/config/media'

export const useHashtagsStore = defineStore('hashtags', {
  state: () => ({
    // Hashtag-specific posts
    hashtagPosts: {
      'LoLPhase5': [
        {
          id: 1,
          username: 'GamerPro',
          userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          date: '2h ago',
          communityName: 'Gaming Community',
          content: 'Just saw the latest updates for LoLPhase5 and I\'m absolutely hyped! This is going to change everything.',
          image: 'https://dims.apnews.com/dims4/default/9a1aa05/2147483647/strip/true/crop/5058x2845+0+263/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fe8%2Fc3%2F568b2887ee1325a267b042192e69%2F8021f5b2054d4f93ac59558090f0e304',
          tags: ['LoLPhase5', 'Gaming', 'Trending'],
          likes: 234,
          comments: 56,
          shares: 18,
          isLiked: false,
          fandom: 'Gaming'
        },
        {
          id: 2,
          username: 'ContentCreator',
          userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          date: '5h ago',
          communityName: 'Content Creators',
          content: 'My detailed analysis of the LoLPhase5 phenomenon. This trend is reshaping the entire landscape and here\'s why you should care.',
          image: null,
          tags: ['LoLPhase5', 'Analysis', 'Content'],
          likes: 189,
          comments: 43,
          shares: 12,
          isLiked: true,
          fandom: 'Content'
        }
      ],
      'Swifties': [
        {
          id: 11,
          username: 'SwiftFan13',
          userAvatar: 'https://randomuser.me/api/portraits/women/25.jpg',
          date: '1h ago',
          communityName: 'Taylor Swift Fans',
          content: 'New Taylor Swift album theories are wild! The Easter eggs in her latest posts are giving me life 💕 #Swifties',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop',
          tags: ['Swifties', 'TaylorSwift', 'Music'],
          likes: 456,
          comments: 89,
          shares: 34,
          isLiked: false,
          fandom: 'Music'
        }
      ],
      'AnimeSpring2024': [
        {
          id: 21,
          username: 'AnimeWatcher',
          userAvatar: 'https://randomuser.me/api/portraits/men/18.jpg',
          date: '3h ago',
          communityName: 'Anime Community',
          content: 'Spring 2024 anime lineup is incredible! So many amazing shows to watch this season #AnimeSpring2024',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
          tags: ['AnimeSpring2024', 'Anime', 'Season'],
          likes: 298,
          comments: 67,
          shares: 23,
          isLiked: true,
          fandom: 'Anime'
        }
      ]
    },

    // Hashtag-specific news
    hashtagNews: {
      'LoLPhase5': [
        {
          id: 101,
          source: 'Gaming News',
          sourceLogo: 'https://logo.clearbit.com/ign.com',
          title: 'Breaking: LoLPhase5 Update Released',
          summary: 'Major update brings new features and improvements to LoLPhase5. Community reaction has been overwhelmingly positive.',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
          date: '1h ago',
          views: '25.3K',
          category: 'Gaming',
          readingTime: '3',
          isLiked: false,
          breaking: true
        },
        {
          id: 102,
          source: 'Esports Central',
          sourceLogo: 'https://logo.clearbit.com/lolesports.com',
          title: 'LoLPhase5 Championship Series Announced',
          summary: 'New tournament format brings exciting changes to the competitive scene with massive prize pools.',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
          date: '4h ago',
          views: '18.7K',
          category: 'Esports',
          readingTime: '5',
          isLiked: false
        }
      ],
      'Swifties': [
        {
          id: 201,
          source: 'Music News',
          sourceLogo: 'https://logo.clearbit.com/billboard.com',
          title: 'Taylor Swift Breaks Another Record',
          summary: 'Latest album achieves unprecedented streaming numbers in first week, Swifties celebrate worldwide.',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop',
          date: '2h ago',
          views: '45.2K',
          category: 'Music',
          readingTime: '4',
          isLiked: false,
          breaking: true
        }
      ]
    },

    // Related hashtags data
    relatedHashtags: [
      {
        name: 'Gaming',
        posts: '5.7M',
        description: 'General gaming discussions and news across all platforms and genres.'
      },
      {
        name: 'Esports',
        posts: '1.2M',
        description: 'Competitive gaming tournaments, professional players, and esports news.'
      },
      {
        name: 'Trending',
        posts: '2.8M',
        description: 'Currently trending topics and viral content across the platform.'
      },
      {
        name: 'Community',
        posts: '1.5M',
        description: 'Community discussions, events, and user-generated content.'
      },
      {
        name: 'Music',
        posts: '3.4M',
        description: 'Music discussions, artist news, and album reviews from all genres.'
      },
      {
        name: 'Anime',
        posts: '2.1M',
        description: 'Anime discussions, reviews, fan art, and seasonal anime content.'
      }
    ],

    // Inlined hashtag descriptions and stats (from constants)
    descriptions: {
      LoLPhase5: 'Discover the latest updates and discussions about League of Legends Phase 5.',
      LoLWorlds: 'Follow the excitement of League of Legends World Championship.',
      Swifties: 'Join Taylor Swift fans sharing their love and latest updates.',
      AnimeSpring2024: 'Spring anime season discussions and recommendations.',
      MarvelPhase6: 'Marvel Cinematic Universe Phase 6 theories and news.',
      KPopComeback: 'Latest K-Pop comebacks and music releases.',
      GameOfThrones2024: 'House of the Dragon and Game of Thrones universe content.',
      NintendoDirect: 'Nintendo Direct announcements and gaming news.'
    },
    stats: {
      LoLPhase5: { posts: '2.3M', growth: '24' },
      LoLWorlds: { posts: '897K', growth: '18' },
      Swifties: { posts: '3.1M', growth: '32' },
      AnimeSpring2024: { posts: '1.8M', growth: '15' },
      MarvelPhase6: { posts: '2.1M', growth: '28' },
      KPopComeback: { posts: '1.6M', growth: '22' },
      GameOfThrones2024: { posts: '945K', growth: '19' },
      NintendoDirect: { posts: '1.2M', growth: '12' }
    }
  }),

  getters: {
    // Get posts by hashtag
    getPostsByHashtag: (state) => (hashtag) => {
      return state.hashtagPosts[hashtag] || []
    },

    // Get news by hashtag
    getNewsByHashtag: (state) => (hashtag) => {
      return state.hashtagNews[hashtag] || []
    },

    // Generate default posts for hashtags without specific data
    getDefaultPostsForHashtag: (state) => (hashtag) => {
      return [
        {
          id: 999,
          username: 'HashtagFan',
          userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
          date: '2h ago',
          communityName: 'General Community',
          content: `Excited to be part of the #${hashtag} conversation! This hashtag is bringing together amazing content and discussions.`,
          image: null,
          tags: [hashtag, 'Community', 'Discussion'],
          likes: 45,
          comments: 12,
          shares: 3,
          isLiked: false,
          fandom: 'General'
        }
      ]
    },

    // Generate default news for hashtags without specific data
    getDefaultNewsForHashtag: (state) => (hashtag) => {
      return [
        {
          id: 998,
          source: 'Community News',
          sourceLogo: 'https://logo.clearbit.com/medium.com',
          title: `#${hashtag} Trending Now`,
          summary: `The ${hashtag} hashtag is gaining momentum with engaging discussions and trending content from the community.`,
          image: getHashtagImage(hashtag),
          date: '3h ago',
          views: '8.5K',
          category: 'Community',
          readingTime: '3',
          isLiked: false
        }
      ]
    },

    // Get all related hashtags
    getAllRelatedHashtags: (state) => {
      return state.relatedHashtags
    },

    // New getters for inlined descriptions and stats
    getHashtagDescription: (state) => (hashtag) => state.descriptions[hashtag] || `Join the conversation about #${hashtag} and connect with like-minded fans.`,
    getHashtagStats: (state) => (hashtag) => state.stats[hashtag] || { posts: '500K', growth: '10' }
  },

  actions: {
    // Add new hashtag post
    addHashtagPost(hashtag, post) {
      if (!this.hashtagPosts[hashtag]) {
        this.hashtagPosts[hashtag] = []
      }
      const newId = Date.now()
      this.hashtagPosts[hashtag].unshift({
        id: newId,
        ...post
      })
    },

    // Like hashtag post
    likeHashtagPost(hashtag, postId) {
      const posts = this.hashtagPosts[hashtag]
      if (posts) {
        const post = posts.find(p => p.id === postId)
        if (post) {
          post.isLiked = !post.isLiked
          post.likes += post.isLiked ? 1 : -1
        }
      }
    },

    // Share hashtag post
    shareHashtagPost(hashtag, postId) {
      const posts = this.hashtagPosts[hashtag]
      if (posts) {
        const post = posts.find(p => p.id === postId)
        if (post) {
          post.shares += 1
        }
      }
    },

    // Add related hashtag
    addRelatedHashtag(hashtag) {
      if (!this.relatedHashtags.find(h => h.name === hashtag.name)) {
        this.relatedHashtags.push(hashtag)
      }
    }
  }
})
