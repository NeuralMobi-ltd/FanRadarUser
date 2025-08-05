// Hashtag statistics mapping
export const hashtagStats = {
  'LoLPhase5': { posts: '2.3M', growth: '24' },
  'LoLWorlds': { posts: '897K', growth: '18' },
  'Swifties': { posts: '3.1M', growth: '32' },
  'AnimeSpring2024': { posts: '1.8M', growth: '15' },
  'MarvelPhase6': { posts: '2.1M', growth: '28' },
  'KPopComeback': { posts: '1.6M', growth: '22' },
  'GameOfThrones2024': { posts: '945K', growth: '19' },
  'NintendoDirect': { posts: '1.2M', growth: '12' }
}

// Helper function to get hashtag stats
export const getHashtagStats = (hashtagName) => {
  return hashtagStats[hashtagName] || { posts: '500K', growth: '10' }
}
