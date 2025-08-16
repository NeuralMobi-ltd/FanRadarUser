// Centralized media helper utilities
// Prefer dynamic image generation over hardcoded constants so backend can supply media later.

// Basic mappings to yield nicer images for known categories/hashtags.
const CATEGORY_TO_QUERY = {
  'Football': 'soccer stadium match',
  'Basketball': 'basketball court game',
  'Tennis': 'tennis court sport',
  'Esports': 'esports gaming arena',
  'Gaming': 'gaming setup rgb',
  'K-pop': 'kpop concert stage',
  'Anime': 'anime illustration art',
  'Movies': 'cinema movie theater',
  'Music': 'music concert crowd',
  'Tech Gadgets': 'tech gadgets electronics',
  'Collectibles': 'collectibles figurines',
  'Books': 'books library reading',
  'Apparel': 'fashion apparel clothes',
  'Home & Living': 'home decor interior',
  'Posters': 'poster wall art'
}

const HASHTAG_TO_QUERY = {
  'LoLPhase5': 'league of legends esports',
  'Swifties': 'taylor swift concert',
  'AnimeSpring2024': 'spring anime art'
}

function buildUnsplashUrl(query, size = '800x500') {
  const q = encodeURIComponent(query || 'fandom')
  return `https://source.unsplash.com/${size}/?${q}`
}

export function getCategoryImage(category, size) {
  const query = CATEGORY_TO_QUERY[category] || category || 'fandom'
  return buildUnsplashUrl(query, size)
}

export function getHashtagImage(hashtag, size) {
  // Remove leading # if present
  const tag = (hashtag || '').toString().replace(/^#/, '')
  const query = HASHTAG_TO_QUERY[tag] || tag || 'trending'
  return buildUnsplashUrl(query, size)
}

export default {
  getCategoryImage,
  getHashtagImage
}
