// Hashtag images mapping
export const hashtagImages = {
  'LoLPhase5': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
  'LoLWorlds': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
  'Swifties': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
  'AnimeSpring2024': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
  'MarvelPhase6': 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=400&fit=crop',
  'KPopComeback': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
  'GameOfThrones2024': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=400&fit=crop',
  'NintendoDirect': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop'
}

// Helper function to get hashtag image
export const getHashtagImage = (hashtagName) => {
  return hashtagImages[hashtagName] || 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=1200&h=400&fit=crop'
}
