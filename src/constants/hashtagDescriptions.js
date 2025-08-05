// Hashtag descriptions for different hashtags
export const hashtagDescriptions = {
  'LoLPhase5': 'Discover the latest updates and discussions about League of Legends Phase 5.',
  'LoLWorlds': 'Follow the excitement of League of Legends World Championship.',
  'Swifties': 'Join Taylor Swift fans sharing their love and latest updates.',
  'AnimeSpring2024': 'Spring anime season discussions and recommendations.',
  'MarvelPhase6': 'Marvel Cinematic Universe Phase 6 theories and news.',
  'KPopComeback': 'Latest K-Pop comebacks and music releases.',
  'GameOfThrones2024': 'House of the Dragon and Game of Thrones universe content.',
  'NintendoDirect': 'Nintendo Direct announcements and gaming news.'
}

// Helper function to get hashtag description
export const getHashtagDescription = (hashtagName) => {
  return hashtagDescriptions[hashtagName] || `Join the conversation about #${hashtagName} and connect with like-minded fans.`
}
