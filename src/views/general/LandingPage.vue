<template>
  <div class="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
    <!-- decorative background -->
    <div class="absolute inset-0 -z-10 aurora"></div>
    <!-- Header -->
    <header class="relative z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Left: Logo -->
          <div class="flex items-center relative">
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

            <!-- Language switcher -->
            <select
              v-model="locale"
              @change="onChangeLocale"
              class="px-3 py-2 rounded-lg border border-gray-300/60 dark:border-gray-700 bg-white/70 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/70"
              aria-label="Select language"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>

            <!-- Login Button -->
            <router-link 
              to="/login"
              class="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              {{ $t('header.signIn') }}
            </router-link>

            <!-- Get Started Button -->
            <router-link 
              to="/signup"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              {{ $t('header.signUp') }}
            </router-link>
          </div>
        </div>
      </div>
      <!-- gradient hairline -->
      <div class="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent"></div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-primary-50/60 to-slate-100 dark:from-gray-800/70 dark:via-gray-900 dark:to-gray-900">
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-0 right-0 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <!-- subtle dotted pattern to break white space -->
        <div class="pointer-events-none absolute inset-0 pattern-dots opacity-[0.06] dark:opacity-[0.08]"></div>
        <!-- mesh gradient overlay for stronger color presence -->
        <div class="pointer-events-none absolute inset-0 mesh opacity-25 dark:opacity-20"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
            {{ $t('hero.titleBefore') }} <span class="text-primary-600">FanRadar</span> {{ $t('hero.titleAfter') }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {{ $t('hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <router-link to="/login" class="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-primary-500/25 hover:shadow-secondary-500/30 transform hover:scale-105 transition-all duration-300">
              <span class="relative z-10">{{ $t('hero.ctaPrimary') }}</span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </router-link>
            <router-link to="/login" class="flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold text-lg hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ $t('hero.ctaSecondary') }}
            </router-link>
          </div>
          <!-- How it works teaser -->
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('hero.teaser') }}</p>
        </div>
      </div>
      <!-- soft color glow under CTAs -->
      <div class="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 w-[680px] h-[240px] bg-gradient-to-r from-primary-400/25 via-secondary-400/25 to-primary-400/25 blur-3xl rounded-full"></div>
      <!-- wave divider to transition into the next section background -->
      <div class="absolute inset-x-0 -bottom-1 text-gray-50 dark:text-gray-800 select-none" aria-hidden="true">
        <svg class="w-full h-16 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C240,80 480,80 720,30 C960,-20 1200,-10 1440,20 L1440,100 L0,100 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 relative bg-gradient-to-b from-slate-50 via-primary-50/90 to-slate-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
      <div class="pointer-events-none absolute inset-0 pattern-dots opacity-[0.06] dark:opacity-[0.04]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center group">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 ring-1 ring-white/60 dark:ring-white/10 shadow-sm">
              <component :is="stat.icon" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div class="text-4xl font-black text-gray-900 dark:text-white mb-2">{{ stat.value }}</div>
            <div class="text-gray-600 dark:text-gray-300 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-24 relative bg-gradient-to-b from-slate-50 via-primary-50/60 to-slate-100 dark:from-gray-900 dark:via-gray-800/60 dark:to-gray-900">
      <div class="pointer-events-none absolute inset-0 pattern-dots opacity-[0.05] dark:opacity-[0.04]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">{{ $t('howItWorks.title') }}</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{{ $t('howItWorks.subtitle') }}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(step, i) in howItWorks" :key="step.title" class="group relative p-8 rounded-3xl bg-gradient-to-br from-white/90 via-primary-50/70 to-secondary-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 ring-1 ring-gray-200/70 dark:ring-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center justify-between mb-6">
              <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl">
                <component :is="step.icon" class="w-7 h-7 text-white" />
              </div>
              <span class="text-sm font-semibold text-gray-400">Step {{ i + 1 }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ step.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 relative bg-gradient-to-b from-slate-50 via-primary-50/60 to-slate-100 dark:from-gray-900 dark:via-gray-800/60 dark:to-gray-900">
      <div class="pointer-events-none absolute inset-0 pattern-dots opacity-[0.05] dark:opacity-[0.04]"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {{ $t('features.titleBefore') }} <span class="text-secondary-600">{{ $t('features.titleHighlight') }}</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ $t('features.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.name" class="group relative p-8 rounded-3xl bg-gradient-to-br from-white/90 via-primary-50/70 to-secondary-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 ring-1 ring-gray-200/70 dark:ring-white/10 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <component :is="feature.icon" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ feature.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ feature.description }}</p>
            <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Communities Section -->
    <section id="communities" class="py-24 bg-gradient-to-br from-slate-50 via-primary-50/50 to-slate-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {{ $t('trending.title') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ $t('trending.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="community in trendingCommunities" :key="community.name" class="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ring-1 ring-gray-200 dark:ring-gray-700">
            <div class="aspect-square relative">
              <img :src="community.image" :alt="community.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold mb-2">{{ community.name }}</h3>
                <div class="flex items-center justify-between text-sm">
                </div>
              </div>
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 shadow-md">{{ community.category }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/login" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            {{ $t('trending.exploreAll') }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-gradient-to-b from-slate-50 via-gray-50 to-primary-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">{{ $t('faq.title') }}</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">{{ $t('faq.subtitle') }}</p>
        </div>
        <div class="space-y-6">
          <div v-for="faq in faqs" :key="faq.q" class="p-6 rounded-2xl ring-1 ring-gray-200/70 dark:ring-gray-700 bg-gradient-to-br from-white/90 via-primary-50/60 to-secondary-50/40 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ faq.q }}</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-20"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-20"></div>
      </div>
      <div class="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl md:text-6xl font-black text-white mb-8">
          {{ $t('cta.title') }}
        </h2>
        <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          {{ $t('cta.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <router-link to="/signup" class="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300">
            {{ $t('cta.primary') }}
          </router-link>
          <router-link to="/signup" class="px-10 py-5 border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
            {{ $t('cta.secondary') }}
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
import { Users, MessageCircle, Star, Heart, TrendingUp, Zap, Globe, Shield, Twitter, Facebook, Instagram, Linkedin } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useThemeStore } from '@/store/index'
import { useI18n } from 'vue-i18n'

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

    // i18n locale state
    const { locale: i18nLocale, t } = useI18n()
    const locale = ref(typeof localStorage !== 'undefined' ? (localStorage.getItem('locale') || i18nLocale.value) : i18nLocale.value)
    const onChangeLocale = () => {
      i18nLocale.value = locale.value
      try { if (typeof localStorage !== 'undefined') localStorage.setItem('locale', locale.value) } catch {}
      if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', locale.value)
    }

    // Landing page data (computed to react to locale changes)
    const stats = computed(() => [
      { label: t('stats.activeUsers'), value: '1.2M+', icon: Users },
      { label: t('stats.fandoms'), value: '12k+', icon: Star },
      { label: t('stats.dailyPosts'), value: '85k+', icon: MessageCircle },
      { label: t('stats.countries'), value: '120+', icon: Globe },
    ])

    const howItWorks = computed(() => [
      { icon: Zap, title: t('howItWorks.steps.discover.title'), description: t('howItWorks.steps.discover.desc') },
      { icon: Users, title: t('howItWorks.steps.join.title'), description: t('howItWorks.steps.join.desc') },
      { icon: MessageCircle, title: t('howItWorks.steps.engage.title'), description: t('howItWorks.steps.engage.desc') },
    ])

    const features = computed(() => [
      { icon: MessageCircle, name: t('features.items.discussions.name'), description: t('features.items.discussions.desc') },
      { icon: Star, name: t('features.items.smartFandoms.name'), description: t('features.items.smartFandoms.desc') },
      { icon: Globe, name: t('features.items.globalReach.name'), description: t('features.items.globalReach.desc') },
      { icon: Shield, name: t('features.items.safeEnvironment.name'), description: t('features.items.safeEnvironment.desc') },
      { icon: TrendingUp, name: t('features.items.trendingContent.name'), description: t('features.items.trendingContent.desc') },
      { icon: Zap, name: t('features.items.fanEvents.name'), description: t('features.items.fanEvents.desc') },
    ])

    const trendingCommunities = [
      { name: 'Global Sports', category: 'Sports', image: '/images/F.png' },
      { name: 'Anime & Manga', category: 'Anime', image: '/images/F.png' },
      { name: 'Top Games', category: 'Gaming', image: '/images/F.png' },
      { name: 'Pop Culture', category: 'Culture', image: '/images/F.png' },
    ]

    const faqs = [
      { q: 'What is FanRadar?', a: 'A platform for fans to discover fandoms, follow trends, and connect with communities.' },
      { q: 'Is FanRadar free?', a: 'Yes. You can browse, follow fandoms, and participate for free.' },
      { q: 'How do I join a fandom?', a: 'Create an account, search your interest, and follow fandoms to personalize your feed.' },
    ]

    const footerNavigation = {
      product: [
        { name: 'Features', href: '#features' },
        { name: 'Trending', href: '#communities' },
        { name: 'FAQ', href: '#faq' },
      ],
      company: [
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Careers', href: '#' },
      ],
      social: [
        { name: 'Twitter', href: '#', icon: Twitter },
        { name: 'Facebook', href: '#', icon: Facebook },
        { name: 'Instagram', href: '#', icon: Instagram },
        { name: 'LinkedIn', href: '#', icon: Linkedin },
      ]
    }

    return {
      isDark,
      toggleTheme,
      locale,
      onChangeLocale,
      stats,
      howItWorks,
      features,
      trendingCommunities,
      faqs,
      footerNavigation,
      t,
    }
  }
}
</script>