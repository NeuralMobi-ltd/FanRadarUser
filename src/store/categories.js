import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    // Inlined categories (previously from constants/communityCategories)
    categories: [
      { name: 'All', color: '#6366F1', faIcon: 'fas fa-star' },
      { name: 'News', color: '#F59E42', faIcon: 'fas fa-newspaper' },
      { name: 'Art', color: '#F472B6', faIcon: 'fas fa-palette' },
      { name: 'Gaming', color: '#60A5FA', faIcon: 'fas fa-gamepad' },
      { name: 'Music', color: '#A78BFA', faIcon: 'fas fa-music' },
      { name: 'Movies', color: '#FBBF24', faIcon: 'fas fa-film' },
      { name: 'TV Shows', color: '#34D399', faIcon: 'fas fa-tv' },
      { name: 'Books', color: '#F87171', faIcon: 'fas fa-book' },
      { name: 'Technology', color: '#38BDF8', faIcon: 'fas fa-laptop' },
      { name: 'Science', color: '#4ADE80', faIcon: 'fas fa-microscope' },
      { name: 'Sports', color: '#F472B6', faIcon: 'fas fa-futbol' },
      { name: 'Fashion', color: '#F59E42', faIcon: 'fas fa-tshirt' }
    ],

    // Inlined descriptions (previously from constants/categoryDescriptions)
    descriptions: {
      sport: 'Connect with sports fans, follow your favorite teams, and discuss the latest games and events.',
      music: 'Share your favorite tracks, discover new artists, and connect with music lovers worldwide.',
      tech: 'Stay updated on the latest tech news, product releases, and industry trends.',
      gaming: 'Find gaming communities, share gameplay strategies, and connect with fellow gamers.',
      anime: 'Discuss your favorite anime series, share fan art, and stay updated on new releases.',
      movies: 'Talk about the latest blockbusters, classic films, and connect with movie enthusiasts.',
      books: 'Explore literary discussions, book recommendations, and connect with fellow readers.',
      art: 'Share your artwork, discover talented artists, and join creative communities.',
      'tv-shows': 'Discuss episodes, theories, and news about your favorite TV series.',
      comics: 'Connect with comic book fans, discuss storylines, and share your favorite characters.',
      fashion: 'Stay on top of trends, share outfit inspirations, and connect with fashion enthusiasts.',
      photography: 'Share your photos, learn techniques, and connect with photographers worldwide.'
    },

    // Inlined category colors (previously from constants/categoryColors)
    colors: {
      sport: 'bg-orange-600',
      music: 'bg-pink-600',
      tech: 'bg-gray-600',
      gaming: 'bg-green-600',
      anime: 'bg-purple-600',
      movies: 'bg-yellow-600',
      books: 'bg-amber-600',
      art: 'bg-purple-600',
      'tv-shows': 'bg-indigo-600',
      comics: 'bg-blue-600',
      fashion: 'bg-rose-600',
      photography: 'bg-teal-600'
    },

    // Inlined category statistics (previously from constants/categoryStats)
    stats: {
      sport: { communities: '450+', members: '2.5M+' },
      music: { communities: '680+', members: '3.8M+' },
      tech: { communities: '320+', members: '1.7M+' },
      gaming: { communities: '890+', members: '4.2M+' },
      anime: { communities: '750+', members: '3.1M+' },
      movies: { communities: '520+', members: '2.8M+' },
      books: { communities: '280+', members: '1.5M+' },
      art: { communities: '340+', members: '1.9M+' },
      'tv-shows': { communities: '620+', members: '3.4M+' },
      comics: { communities: '430+', members: '2.3M+' },
      fashion: { communities: '290+', members: '1.6M+' },
      photography: { communities: '380+', members: '2.1M+' }
    }
  }),
  getters: {
    getCategories: (state) => state.categories,
    getCategoryDescription: (state) => (categoryName, formattedName) => {
      return state.descriptions[categoryName] || `Join the ${formattedName || categoryName} community and connect with fellow enthusiasts.`
    },
    getCategoryColor: (state) => (categoryName) => {
      return state.colors[categoryName] || 'bg-blue-600'
    },
    getCategoryStats: (state) => (categoryName) => {
      return state.stats[categoryName] || { communities: '250+', members: '1.2M+' }
    }
  }
})
