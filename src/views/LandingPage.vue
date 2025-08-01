<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-12 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span class="block">Connect with your</span>
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">favorite fandoms</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join millions of fans discussing, sharing, and celebrating their passions in one vibrant community.
              </p>
              <div class="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4">
                <button class="flex-shrink-0 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg transform transition-all hover:scale-105">
                  Get Started
                </button>
                <button class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 dark:text-purple-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                  Explore Communities
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div class="relative h-64 sm:h-72 md:h-96 lg:h-full">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 opacity-20 dark:opacity-10 rounded-full filter blur-3xl transform translate-x-1/4 translate-y-1/4"></div>
          <img class="absolute inset-0 w-full h-full object-cover lg:object-contain object-right" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Fans celebrating">
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
              <component :is="stat.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-purple-600 dark:text-purple-400 font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything fans need in one place
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Discover, connect, and engage with your favorite fandoms like never before.
          </p>
        </div>

        <div class="mt-16">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="feature in features" :key="feature.name" class="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="absolute -top-6 -right-6 h-16 w-16 bg-purple-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div class="absolute -bottom-6 -left-6 h-16 w-16 bg-blue-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div class="relative">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                  <component :is="feature.icon" class="h-6 w-6" />
                </div>
                <h3 class="mt-6 text-lg font-medium text-gray-900 dark:text-white">{{ feature.name }}</h3>
                <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trending Communities -->
    <div class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base text-purple-600 dark:text-purple-400 font-semibold tracking-wide uppercase">Trending</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Popular Communities
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Join millions of fans in these active communities
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="community in trendingCommunities" :key="community.name" class="group bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow transform hover:-translate-y-1">
            <div class="relative h-40 overflow-hidden">
              <img class="w-full h-full object-cover" :src="community.image" :alt="community.name" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <h3 class="text-xl font-bold text-white">{{ community.name }}</h3>
                <p class="text-purple-200 text-sm">{{ community.members }} members</p>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
                  {{ community.category }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ community.posts }} posts today</span>
              </div>
              <button class="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <div class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-purple-600 dark:text-purple-400 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What our fans say
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex items-center">
              <img class="h-12 w-12 rounded-full" :src="testimonial.avatar" :alt="testimonial.name" />
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ testimonial.name }}</h4>
                <p class="text-purple-600 dark:text-purple-400">{{ testimonial.handle }}</p>
              </div>
            </div>
            <p class="mt-4 text-gray-500 dark:text-gray-400">
              "{{ testimonial.quote }}"
            </p>
            <div class="mt-4 flex items-center">
              <div v-for="i in 5" :key="i" class="text-yellow-400">
                <Star class="h-5 w-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-purple-600 to-blue-500">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span class="block">Ready to dive in?</span>
          <span class="block text-purple-200">Join FanRadar today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <button class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors transform hover:scale-105">
              Get started
            </button>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <button class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 bg-opacity-60 hover:bg-opacity-70 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Product</h3>
            <ul class="mt-4 space-y-4">
              <li v-for="item in footerNavigation.product" :key="item.name">
                <a :href="item.href" class="text-base text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Company</h3>
            <ul class="mt-4 space-y-4">
              <li v-for="item in footerNavigation.company" :key="item.name">
                <a :href="item.href" class="text-base text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul class="mt-4 space-y-4">
              <li v-for="item in footerNavigation.legal" :key="item.name">
                <a :href="item.href" class="text-base text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Connect</h3>
            <ul class="mt-4 space-y-4">
              <li v-for="item in footerNavigation.connect" :key="item.name">
                <a :href="item.href" class="text-base text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-base text-gray-500 dark:text-gray-400">
            &copy; 2024 FanRadar. All rights reserved.
          </p>
          <div class="mt-4 md:mt-0 flex space-x-6">
            <a v-for="item in footerNavigation.social" :key="item.name" :href="item.href" class="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
              <span class="sr-only">{{ item.name }}</span>
              <component :is="item.icon" class="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { Users, MessageCircle, Star, Heart, TrendingUp, Shirt, Hash, Newspaper, Twitter, Facebook, Instagram, Linkedin } from 'lucide-vue-next';

export default {
  name: 'LandingPage',
  components: {
    Users,
    MessageCircle,
    Star,
    Heart,
    TrendingUp,
    Shirt,
    Hash,
    Newspaper,
    Twitter,
    Facebook,
    Instagram,
    Linkedin
  },
  data() {
    return {
      stats: [
        { label: "Active Users", value: "2.4M+", icon: 'Users' },
        { label: "Communities", value: "50K+", icon: 'Heart' },
        { label: "Daily Posts", value: "100K+", icon: 'MessageCircle' },
        { label: "Happy Fans", value: "98%", icon: 'Star' }
      ],
      features: [
        {
          name: "Vibrant Communities",
          description: "Join thousands of active communities for every fandom imaginable.",
          icon: 'Users'
        },
        {
          name: "Real-time Discussions",
          description: "Chat with fans from around the world in real-time.",
          icon: 'MessageCircle'
        },
        {
          name: "Trending Content",
          description: "Discover what's hot in your favorite fandoms right now.",
          icon: 'TrendingUp'
        },
        {
          name: "Fan Creations",
          description: "Share your art, cosplay, and creations with the world.",
          icon: 'Shirt'
        },
        {
          name: "Exclusive Merch",
          description: "Get access to limited edition fan merchandise.",
          icon: 'Shirt'
        },
        {
          name: "Live Events",
          description: "Connect with fans at virtual and in-person events.",
          icon: 'Star'
        }
      ],
      trendingCommunities: [
        {
          name: "Anime Enthusiasts",
          members: "2.5M members",
          posts: "45K",
          category: "Anime",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
        },
        {
          name: "Marvel Cinematic Universe",
          members: "1.8M members",
          posts: "32K",
          category: "Movies",
          image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=200&fit=crop"
        },
        {
          name: "K-Pop Universe",
          members: "3.2M members",
          posts: "67K",
          category: "Music",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
        },
        {
          name: "Gaming Legends",
          members: "4.1M members",
          posts: "89K",
          category: "Gaming",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop"
        }
      ],
      testimonials: [
        {
          name: "Alex Johnson",
          handle: "@animefan92",
          quote: "FanRadar completely changed how I connect with other anime fans. The community is amazing!",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "Sarah Miller",
          handle: "@marvelfanatic",
          quote: "I've met so many great people who share my passion for Marvel. Best platform for fans!",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "David Kim",
          handle: "@kpopstan",
          quote: "The K-Pop community on FanRadar is next level. So much great content and discussions.",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
      ],
      footerNavigation: {
        product: [
          { name: 'Features', href: '#' },
          { name: 'Communities', href: '#' },
          { name: 'Trending', href: '#' },
          { name: 'Merch', href: '#' }
        ],
        company: [
          { name: 'About', href: '#' },
          { name: 'Blog', href: '#' },
          { name: 'Careers', href: '#' },
          { name: 'Contact', href: '#' }
        ],
        legal: [
          { name: 'Privacy', href: '#' },
          { name: 'Terms', href: '#' },
          { name: 'Cookie Policy', href: '#' }
        ],
        connect: [
          { name: 'Help Center', href: '#' },
          { name: 'Events', href: '#' },
          { name: 'Partners', href: '#' }
        ],
        social: [
          {
            name: 'Twitter',
            href: '#',
            icon: 'Twitter'
          },
          {
            name: 'Facebook',
            href: '#',
            icon: 'Facebook'
          },
          {
            name: 'Instagram',
            href: '#',
            icon: 'Instagram'
          },
          {
            name: 'LinkedIn',
            href: '#',
            icon: 'Linkedin'
          }
        ]
      }
    }
  }
}
</script>

<style>
/* Animation for gradient text */
.animate-gradient {
  background-size: 300% 300%;
  animation: gradient 6s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.dark ::-webkit-scrollbar-track {
  background: #2d3748;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4a5568;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>