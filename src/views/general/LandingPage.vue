<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
    <!-- Header -->
    <header class="relative z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Left: Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <img 
                src="/images/FanRadar.png"
                alt="FanRadar" 
                class="h-11 w-auto dark:hidden"
              />
              <img 
                src="/images/FanRadarWhite.png"
                alt="FanRadar" 
                class="h-11 w-auto hidden dark:block"
              />
            </router-link>
          </div>

          <!-- Navigation & Actions -->
          <div class="flex items-center space-x-4">
            <!-- Dark Mode Toggle -->
            <button 
              @click="toggleTheme"
              class="p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-all duration-200 group"
            >
              <i v-if="!isDark" class="fas fa-moon w-5 h-5 group-hover:rotate-12 transition-transform"></i>
              <i v-else class="fas fa-sun w-5 h-5 group-hover:rotate-12 transition-transform"></i>
            </button>

            <!-- Login Button -->
            <router-link 
              to="/login"
              class="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Sign In
            </router-link>

            <!-- Get Started Button -->
            <router-link 
              to="/signup"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Sign up
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div class="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
            Where <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 animate-gradient-x">Fandoms</span> Come Alive
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Connect with millions of passionate fans, discover new communities, and dive deep into the worlds you love most.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <router-link to="/login" class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300">
              <span class="relative z-10">Join the Community</span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </router-link>
            <router-link to="/login" class="flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Explore Communities
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center group">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <component :is="stat.icon" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="text-4xl font-black text-gray-900 dark:text-white mb-2">{{ stat.value }}</div>
            <div class="text-gray-600 dark:text-gray-300 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Everything You Need to <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Connect</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to bring fans together and create meaningful connections across all your favorite fandoms.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.name" class="group relative p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <component :is="feature.icon" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ feature.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ feature.description }}</p>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Communities Section -->
    <section id="communities" class="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Trending <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Communities</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join millions of fans in these vibrant communities where passion meets connection.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="community in trendingCommunities" :key="community.name" class="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="aspect-square relative">
              <img :src="community.image" :alt="community.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold mb-2">{{ community.name }}</h3>
                <div class="flex items-center justify-between text-sm">
                  <span class="bg-white/20 backdrop-blur px-3 py-1 rounded-full">{{ community.members }}</span>
                  <span class="text-blue-300">{{ community.posts }} posts today</span>
                </div>
              </div>
              <div class="absolute top-4 right-4">
                <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">{{ community.category }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/login" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Explore All Communities
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Loved by <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Millions</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="relative p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl hover:shadow-xl transition-all duration-300">
            <div class="flex items-center mb-6">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-14 h-14 rounded-2xl object-cover" />
              <div class="ml-4">
                <h4 class="font-bold text-gray-900 dark:text-white">{{ testimonial.name }}</h4>
                <p class="text-blue-600 dark:text-blue-400 text-sm">{{ testimonial.handle }}</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-lg italic leading-relaxed">"{{ testimonial.quote }}"</p>
            <div class="flex mt-6">
              <div v-for="i in 5" :key="i" class="text-yellow-400">
                <Star class="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-20"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-20"></div>
      </div>
      <div class="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl md:text-6xl font-black text-white mb-8">
          Ready to Join the Revolution?
        </h2>
        <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Connect with your community, discover new passions, and be part of something bigger.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <router-link to="/signup" class="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300">
            Start Your Journey
          </router-link>
          <router-link to="/signup" class="px-10 py-5 border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
            Learn More
          </router-link>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 mb-12">
          <div class="md:col-span-2">
            <div class="flex items-center mb-6">
               <img 
                src="/images/FanRadarWhite.png"
                alt="FanRadar" 
                class="h-11 w-auto"
              />
            </div>
            <p class="text-gray-400 text-lg leading-relaxed max-w-md">
              The ultimate destination for fans to connect, share, and celebrate their passions together.
            </p>
          </div>
          <div v-for="(section, key) in footerNavigation" :key="key" class="space-y-4">
            <h3 class="font-bold text-lg capitalize">{{ key }}</h3>
            <ul class="space-y-3">
              <li v-for="item in section" :key="item.name">
                <a :href="item.href" class="text-gray-400 hover:text-white transition-colors">{{ item.name }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400">&copy; 2024 FanRadar. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a v-for="social in footerNavigation.social" :key="social.name" :href="social.href" class="text-gray-400 hover:text-white transition-colors">
              <component :is="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { Users, MessageCircle, Star, Heart, TrendingUp, Zap, Globe, Shield, Twitter, Facebook, Instagram, Linkedin } from 'lucide-vue-next';
import { computed } from 'vue'
import { useThemeStore } from '@/store/index'

export default {
  name: 'LandingPage',
  components: {
    Users,
    MessageCircle,
    Star,
    Heart,
    TrendingUp,
    Zap,
    Globe,
    Shield,
    Twitter,
    Facebook,
    Instagram,
    Linkedin
  },
  setup() {
    const themeStore = useThemeStore()
    const isDark = computed(() => themeStore.isDark)

    const toggleTheme = () => {
      themeStore.toggleTheme()
    }

    return {
      isDark,
      toggleTheme
    }
  },
  data() {
    return {
      stats: [
        { label: "Active Users", value: "2.4M+", icon: 'Users' },
        { label: "Communities", value: "50K+", icon: 'Heart' },
        { label: "Daily Posts", value: "100K+", icon: 'MessageCircle' },
        { label: "Countries", value: "150+", icon: 'Globe' }
      ],
      features: [
        {
          name: "Real-time Chat",
          description: "Connect instantly with fans worldwide through lightning-fast messaging and live discussions.",
          icon: 'MessageCircle'
        },
        {
          name: "Smart Communities",
          description: "AI-powered recommendations help you discover communities that match your interests perfectly.",
          icon: 'Zap'
        },
        {
          name: "Global Reach",
          description: "Join fans from every corner of the world and experience truly diverse perspectives.",
          icon: 'Globe'
        },
        {
          name: "Safe Environment",
          description: "Advanced moderation tools ensure a positive and welcoming space for all fans.",
          icon: 'Shield'
        },
        {
          name: "Trending Content",
          description: "Stay ahead of the curve with real-time trending topics and viral content in your fandoms.",
          icon: 'TrendingUp'
        },
        {
          name: "Fan Events",
          description: "Exclusive access to virtual meetups, AMAs, and special events with creators and celebrities.",
          icon: 'Star'
        }
      ],
      trendingCommunities: [
        {
          name: "Anime Universe",
          members: "2.5M members",
          posts: "45K",
          category: "Anime",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center"
        },
        {
          name: "Marvel Multiverse",
          members: "1.8M members",
          posts: "32K",
          category: "Movies",
          image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=400&fit=crop&crop=center"
        },
        {
          name: "K-Pop Central",
          members: "3.2M members",
          posts: "67K",
          category: "Music",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center"
        },
        {
          name: "Gaming Hub",
          members: "4.1M members",
          posts: "89K",
          category: "Gaming",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop&crop=center"
        }
      ],
      testimonials: [
        {
          name: "Alex Chen",
          handle: "@alexanime",
          quote: "FanRadar transformed how I connect with fellow anime enthusiasts. The community here is incredible and so welcoming!",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "Maria Rodriguez",
          handle: "@marvelmania",
          quote: "As a Marvel superfan, I've found my tribe here. The discussions are deep, the theories are wild, and the friends are real.",
          avatar: "https://www.equaljusticeworks.org/wp-content/uploads/2018/10/Rodriguez-Maria.jpg"
        },
        {
          name: "David Kim",
          handle: "@kpopking",
          quote: "The K-Pop community on FanRadar is next level. Real-time comebacks discussions and exclusive content make it perfect!",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
      ],
      footerNavigation: {
        product: [
          { name: 'Features', href: '#features' },
          { name: 'Communities', href: '#communities' },
          { name: 'Mobile App', href: '#' },
          { name: 'Premium', href: '#' }
        ],
        company: [
          { name: 'About Us', href: '#' },
          { name: 'Careers', href: '#' },
          { name: 'Blog', href: '#' },
          { name: 'Press Kit', href: '#' }
        ],
        support: [
          { name: 'Help Center', href: '#' },
          { name: 'Community Guidelines', href: '#' },
          { name: 'Privacy Policy', href: '#' },
          { name: 'Terms of Service', href: '#' }
        ],
        social: [
          { name: 'Twitter', href: '#', icon: 'Twitter' },
          { name: 'Facebook', href: '#', icon: 'Facebook' },
          { name: 'Instagram', href: '#', icon: 'Instagram' },
          { name: 'LinkedIn', href: '#', icon: 'Linkedin' }
        ]
      }
    }
  }
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes gradient-x {
  0%, 100% { background-size: 200% 200%; background-position: left center; }
  50% { background-size: 200% 200%; background-position: right center; }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
  background-size: 200% 200%;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}

.dark ::-webkit-scrollbar-track {
  background: #1e293b;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>