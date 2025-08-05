// Default fandom configuration data
export const FANDOM_DEFAULTS = {
  coverImage: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=1200&h=400&fit=crop',
  logo: 'https://via.placeholder.com/80x80/3B82F6/ffffff?text=F',
  members: '125K',
  onlineMembers: '2.1K',
  totalPosts: '23.4K',
  createdDate: '2020',
  rules: [
    'Be respectful to all community members',
    'Stay on topic and relevant to the fandom',
    'No spam or excessive self-promotion',
    'Follow community guidelines and rules'
  ],
  tags: ['fandom', 'community', 'discussion'],
  hashtags: [
    { tag: 'Fandom', posts: '12.5K' },
    { tag: 'Community', posts: '8.9K' },
    { tag: 'Discussion', posts: '15.2K' }
  ]
}

// Generate default description for fandoms
export const generateDefaultDescription = (fandomName) => {
  return `Welcome to the ${fandomName} community! Connect with passionate fans and share your enthusiasm.`
}

// Generate default full description for fandoms
export const generateDefaultFullDescription = (fandomName) => {
  return `This is the official ${fandomName} fandom on FanRadar. Here you can discuss everything related to your favorite topic, share content, and connect with like-minded individuals from around the world.`
}
