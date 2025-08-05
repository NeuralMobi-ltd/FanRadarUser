import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [
      {
        id: 1,
        username: 'Alice Martin',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: new Date(Date.now() - 3600000 * 2),
        text: "Just finished watching the latest Attack on Titan episode and I'm speechless! 😭 The animation quality keeps getting better! #AttackOnTitan #Anime",
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400',
        likes: 124,
        comments: 23,
        shares: 8,
        isLiked: false,
        fandom: 'Anime',
        trending: true,
        likedBy: []
      },
      {
        id: 2,
        username: 'Jean Dubois',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: new Date(Date.now() - 3600000 * 5),
        text: "T1 vs G2 was absolutely insane! That Baron steal in game 3 will go down in Worlds history 🔥 #LoLWorlds #Esports",
        tags: ['LoLWorlds', 'Esports', 'T1', 'G2'],
        likes: 89,
        comments: 15,
        shares: 12,
        isLiked: true,
        fandom: 'League of Legends',
        trending: true,
        likedBy: ['currentUser']
      },
      {
        id: 3,
        username: 'Sarah Kim',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
        date: new Date(Date.now() - 3600000 * 8),
        text: "NewJeans' new music video is a masterpiece! The choreography, the visuals, everything is perfect 💕 #NewJeans #Kpop",
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400',
        likes: 156,
        comments: 34,
        shares: 28,
        isLiked: false,
        fandom: 'K-Pop',
        trending: true,
        likedBy: []
      },
      {
        id: 4,
        username: 'GameMaster99',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        date: new Date(Date.now() - 3600000 * 12),
        text: "Spider-Man 2 on PS5 is incredible! The web-swinging feels so smooth and the graphics are mind-blowing 🕷️ #SpiderMan2 #PS5 #Gaming",
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400',
        likes: 78,
        comments: 19,
        shares: 6,
        isLiked: true,
        fandom: 'Gaming',
        trending: false,
        likedBy: ['currentUser']
      },
      {
        id: 5,
        username: 'Marvel_Fan_2024',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
        date: new Date(Date.now() - 3600000 * 16),
        text: "Theory: What if the TVA from Loki will play a major role in the upcoming Avengers movie? The multiverse implications are huge! 🤔 #Marvel #MCU",
        likes: 203,
        comments: 67,
        shares: 45,
        isLiked: false,
        fandom: 'Marvel',
        trending: true,
        likedBy: []
      },
      {
        id: 6,
        username: 'AnimeLover_JP',
        avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
        date: new Date(Date.now() - 3600000 * 20),
        text: "Demon Slayer movie was absolutely phenomenal! The fight scenes were beautifully animated 🗾 ⚔️ #DemonSlayer #Anime",
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400',
        likes: 145,
        comments: 28,
        shares: 17,
        isLiked: true,
        fandom: 'Anime',
        trending: false,
        likedBy: ['currentUser']
      }
    ],
    activeFeed: 'timeline',
    loadingMore: false,
    hasMorePosts: true,

    // Category-specific posts for CategoryDetail pages
    categoryPosts: {
      sport: [
        {
          id: 101,
          username: 'SportsEnthusiast',
          userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          date: '2h ago',
          communityName: 'Premier League Fans',
          content: 'What an incredible match yesterday! The last-minute goal completely changed the league standings. Anyone else think the referee missed a clear penalty in the first half?',
          image: 'https://dims.apnews.com/dims4/default/9a1aa05/2147483647/strip/true/crop/5058x2845+0+263/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fe8%2Fc3%2F568b2887ee1325a267b042192e69%2F8021f5b2054d4f93ac59558090f0e304',
          tags: ['PremierLeague', 'Football', 'MatchDay', 'Referee'],
          likes: 234,
          comments: 56,
          shares: 18,
          isLiked: false,
          fandom: 'Sport'
        },
        {
          id: 102,
          username: 'BasketballFan44',
          userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          date: '5h ago',
          communityName: 'NBA Central',
          content: 'Hot take: This rookie class might be the best we\'ve seen in the past decade. The skill level and basketball IQ of these young players is absolutely off the charts!',
          image: 'https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/02/nba_central.jpg',
          tags: ['NBA', 'Rookies', 'Basketball', 'HotTake'],
          likes: 189,
          comments: 43,
          shares: 12,
          isLiked: true,
          fandom: 'Sport'
        },
        {
          id: 103,
          username: 'F1Analyst',
          userAvatar: 'https://randomuser.me/api/portraits/men/62.jpg',
          date: '1d ago',
          communityName: 'Formula 1',
          content: 'Breaking down the new aerodynamic regulations and how they might affect the competitive balance next season. Teams with high downforce philosophy will need to completely rethink their approach.',
          image: 'https://e0.365dm.com/25/02/2048x1152/skysports-pirelli-f1-2025-test_6820918.jpg?20250206074138',
          tags: ['Formula1', 'F1Regulations', 'Aerodynamics', 'Racing'],
          likes: 312,
          comments: 89,
          shares: 24,
          isLiked: false,
          fandom: 'Sport'
        }
      ],
      gaming: [
        {
          id: 201,
          username: 'GamerPro2024',
          userAvatar: 'https://randomuser.me/api/portraits/men/55.jpg',
          date: '3h ago',
          communityName: 'Gaming Central',
          content: 'The new League of Legends patch completely changed the meta! Assassins are back in a big way. Time to dust off my Zed gameplay 🎮',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
          tags: ['LeagueOfLegends', 'Gaming', 'Meta', 'Patch'],
          likes: 156,
          comments: 34,
          shares: 22,
          isLiked: false,
          fandom: 'Gaming'
        },
        {
          id: 202,
          username: 'PlayStationFan',
          userAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
          date: '6h ago',
          communityName: 'PlayStation Nation',
          content: 'Just got my hands on the new exclusive PS5 game and it\'s absolutely stunning! The graphics and gameplay are next level 🔥',
          image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=500&fit=crop',
          tags: ['PS5', 'PlayStation', 'Gaming', 'Exclusive'],
          likes: 203,
          comments: 67,
          shares: 45,
          isLiked: true,
          fandom: 'Gaming'
        }
      ],
      entertainment: [
        {
          id: 301,
          username: 'AnimeWatcher',
          userAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
          date: '4h ago',
          communityName: 'Anime Enthusiasts',
          content: 'The latest episode of Attack on Titan was absolutely mind-blowing! I can\'t believe they managed to top last week\'s episode 😭',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
          tags: ['AttackOnTitan', 'Anime', 'Manga', 'Episode'],
          likes: 445,
          comments: 123,
          shares: 78,
          isLiked: false,
          fandom: 'Entertainment'
        },
        {
          id: 302,
          username: 'MovieCritic',
          userAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
          date: '8h ago',
          communityName: 'Movie Buffs',
          content: 'Just watched the latest Marvel movie and I have mixed feelings. Great action sequences but the plot felt rushed. What did you all think?',
          image: 'https://images.unsplash.com/photo-1489599510041-0c5812f0d09d?w=800&h=500&fit=crop',
          tags: ['Marvel', 'Movies', 'Review', 'Cinema'],
          likes: 89,
          comments: 45,
          shares: 12,
          isLiked: false,
          fandom: 'Entertainment'
        }
      ]
    }
  }),
  
  getters: {
    filteredPosts: (state) => {
      let filtered = state.posts
      switch (state.activeFeed) {
        case 'trending':
          filtered = filtered.filter(post => post.trending)
          break
        case 'following':
          filtered = filtered.filter(post => post.isLiked)
          break
        default:
          break
      }
      return filtered.sort((a, b) => b.date - a.date)
    },
    
    trendingPosts: (state) => state.posts.filter(post => post.trending),
    followingPosts: (state) => state.posts.filter(post => post.isLiked),
    postsByFandom: (state) => (fandom) => state.posts.filter(post => post.fandom === fandom),
    
    // Get posts by category for CategoryDetail pages
    getPostsByCategory: (state) => (category) => {
      return state.categoryPosts[category] || []
    }
  },
  
  actions: {
    addPost(post) {
      const newPost = {
        id: Date.now(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        fandom: null,
        trending: false,
        likedBy: [],
        date: new Date(),
        ...post
      }
      this.posts.unshift(newPost)
    },
    
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId)
    },
    
    likePost(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.isLiked = !post.isLiked
        post.likes += post.isLiked ? 1 : -1
      }
    },
    
    sharePost(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.shares += 1
      }
    },
    
    setActiveFeed(feed) {
      this.activeFeed = feed
    },
    
    async loadMorePosts() {
      this.loadingMore = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const morePosts = [
        {
          id: Date.now() + Math.random(),
          username: 'TechReviewer',
          avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
          date: new Date(Date.now() - 3600000 * 18),
          text: 'The new iPhone is amazing! Camera quality is incredible 📱 #tech #iPhone',
          likes: 23,
          comments: 5,
          shares: 2,
          isLiked: false,
          fandom: 'Technology',
          trending: false,
          likedBy: []
        }
      ]
      
      this.posts.push(...morePosts)
      this.loadingMore = false
      
      if (this.posts.length > 10) {
        this.hasMorePosts = false
      }
    },
    toggleLike(postId, username) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        if (!post.likedBy) {
          post.likedBy = []
        }
        
        const index = post.likedBy.indexOf(username)
        if (index === -1) {
          post.likedBy.push(username)
          post.likes += 1
        } else {
          post.likedBy.splice(index, 1)
          post.likes -= 1
        }
      }
    },
    updatePost(postId, updatedPost) {
      const index = this.posts.findIndex(post => post.id === postId)
      if (index !== -1) {
        this.posts[index] = updatedPost
      }
    }
  },
  persist: true
})