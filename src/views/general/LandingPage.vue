<template>
  <div class="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
    <!-- decorative background -->
    <div class="absolute inset-0 -z-10 aurora"></div>
    <!-- Header -->
    <header class="relative z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-700 shadow-sm">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <!-- Left: Logo -->
          <div class="flex items-center relative">
            <router-link to="/" class="flex items-center space-x-2">
              <img 
                src="/images/FanRadar.png"
                alt="FanRadar" 
                class="h-8 sm:h-11 w-auto dark:hidden"
              />
              <img 
                src="/images/FanRadarWhite.png"
                alt="FanRadar" 
                class="h-8 sm:h-11 w-auto hidden dark:block"
              />
            </router-link>
          </div>

          <!-- Navigation & Actions -->
          <div class="flex items-center gap-2 sm:gap-4">
            <!-- Dark Mode Toggle -->
            <button 
              @click="toggleTheme"
              class="p-2 sm:p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-all duration-200 group"
            >
              <i v-if="!isDark" class="fas fa-moon w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform"></i>
              <i v-else class="fas fa-sun w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform"></i>
            </button>

            <!-- Language switcher (custom dropdown) -->
            <div class="relative" ref="langWrapperRef">
              <button 
                type="button"
                @click="toggleLangOpen"
                :aria-expanded="isLangOpen.toString()"
                class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-gray-300/60 dark:border-gray-700 bg-white/70 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/70"
                aria-label="Select language"
              >
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold">{{ currentLocaleShort }}</span>
                <svg class="w-3.5 h-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clip-rule="evenodd"/>
                </svg>
              </button>
              <div
                v-if="isLangOpen"
                class="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200/60 dark:border-gray-700 bg-white/90 dark:bg-gray-800 shadow-xl overflow-hidden z-50"
              >
                <button
                  v-for="opt in languages"
                  :key="opt.code"
                  @click="selectLanguage(opt.code)"
                  class="w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/60 text-gray-700 dark:text-gray-200"
                >
                  <span class="flex items-center gap-2">
                    <span class="text-[11px] font-semibold text-gray-500 dark:text-gray-400 w-6">{{ opt.region }}</span>
                    <span class="font-medium">{{ opt.label }}</span>
                  </span>
                  <svg v-if="locale === opt.code" class="w-4 h-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 10l3 3 7-7" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Login Button (icon-only on phones) -->
            <router-link 
              to="/login"
              :aria-label="$t('header.signIn')"
              :title="$t('header.signIn')"
              class="inline-flex items-center justify-center h-9 w-9 sm:h-auto sm:w-auto px-0 sm:px-6 py-0 sm:py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-xl border border-gray-300/60 dark:border-gray-700"
            >
              <LogIn class="w-5 h-5 sm:mr-2" />
              <span class="hidden sm:inline">{{ $t('header.signIn') }}</span>
            </router-link>

            <!-- Get Started Button (icon-only on phones) -->
            <router-link 
              to="/signup"
              :aria-label="$t('header.signUp')"
              :title="$t('header.signUp')"
              class="inline-flex items-center justify-center h-9 w-9 sm:h-auto sm:w-auto px-0 sm:px-6 py-0 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm sm:text-base transition-colors shadow-lg hover:shadow-xl"
            >
              <UserPlus class="w-5 h-5 sm:mr-2" />
              <span class="hidden sm:inline">{{ $t('header.signUp') }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <!-- gradient hairline -->
      <div class="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent"></div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-16 sm:pt-20 pb-24 sm:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-primary-50/60 to-slate-100 dark:from-gray-800/70 dark:via-gray-900 dark:to-gray-900">
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <!-- subtle dotted pattern to break white space -->
        <div class="pointer-events-none absolute inset-0 pattern-dots opacity-[0.06] dark:opacity-[0.08]"></div>
        <!-- mesh gradient overlay for stronger color presence -->
        <div class="pointer-events-none absolute inset-0 mesh opacity-25 dark:opacity-20"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl sm:text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight">
            {{ $t('hero.titleBefore') }} <span class="text-primary-600">FanRadar</span> {{ $t('hero.titleAfter') }}
          </h1>
          <p class="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            {{ $t('hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-10 px-4">
            <router-link to="/login" class="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold text-base sm:text-lg shadow-2xl shadow-primary-500/25 hover:shadow-secondary-500/30 transform hover:scale-105 transition-all duration-300">
              <span class="relative z-10">{{ $t('hero.ctaPrimary') }}</span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </router-link>
            <router-link to="/login" class="flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold text-base sm:text-lg hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300">
              <svg class="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ $t('hero.ctaSecondary') }}
            </router-link>
          </div>
          <!-- How it works teaser -->
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">{{ $t('hero.teaser') }}</p>
        </div>
      </div>
      <!-- soft color glow under CTAs -->
      <div class="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 w-[480px] sm:w-[680px] h-[180px] sm:h-[240px] bg-gradient-to-r from-primary-400/25 via-secondary-400/25 to-primary-400/25 blur-3xl rounded-full"></div>
      <!-- wave divider to transition into the next section background -->
      <div class="absolute inset-x-0 -bottom-1 text-gray-50 dark:text-gray-800 select-none" aria-hidden="true">
        <svg class="w-full h-12 sm:h-16 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C240,80 480,80 720,30 C960,-20 1200,-10 1440,20 L1440,100 L0,100 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 sm:py-20 relative bg-gradient-to-b from-slate-50 via-primary-50/90 to-slate-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
      <div class="pointer-events-none absolute inset-0 pattern-dots opacity-[0.06] dark:opacity-[0.04]"></div>
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center group">
            <div class="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 ring-1 ring-white/60 dark:ring-white/10 shadow-sm">
              <component :is="stat.icon" class="w-6 sm:w-8 h-6 sm:h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div class="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">{{ stat.value }}</div>
            <div class="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 sm:py-24 relative bg-gradient-to-b from-slate-50 via-primary-50/60 to-slate-100 dark:from-gray-900 dark:via-gray-800/60 dark:to-gray-900">
      <div class="pointer-events-none absolute inset-0 pattern-dots opacity-[0.05] dark:opacity-[0.04]"></div>
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-14">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4">{{ $t('howItWorks.title') }}</h2>
          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">{{ $t('howItWorks.subtitle') }}</p>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div v-for="(step, i) in howItWorks" :key="step.title" class="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/90 via-primary-50/70 to-secondary-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 ring-1 ring-gray-200/70 dark:ring-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <div class="inline-flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl">
                <component :is="step.icon" class="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <span class="text-xs sm:text-sm font-semibold text-gray-400">{{ $t('howItWorks.stepLabel', { number: i + 1 }) }}</span>
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{{ step.title }}</h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">{{ step.description }}</p>
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

    <!-- Explore Section (Motivational) -->
    <section id="explore" class="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-secondary-50/40 via-primary-50/50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 pattern-dots opacity-[0.05] dark:opacity-[0.04]"></div>
      <!-- Floating elements for visual appeal -->
      <div class="absolute top-20 left-10 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-secondary-400/20 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-10 sm:mb-12 lg:mb-16 px-4">
          <div class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full mb-4 sm:mb-6">
            <i class="fas fa-fire text-red-500 mr-1.5 sm:mr-2 text-sm"></i>
            <span class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">{{ $t('explore.badgeTrendingNow') }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            {{ $t('explore.titleBefore') }} <span class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">{{ $t('explore.titleHighlight') }}</span> {{ $t('explore.titleAfter') }}
          </h2>
          <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {{ $t('explore.subtitle') }}
            <span class="font-semibold text-primary-600 dark:text-primary-400">{{ $t('explore.subtitleEmphasis') }}</span>
          </p>
        </div>

        <!-- Popular Fandoms Carousel -->
        <div class="mb-12 sm:mb-16 lg:mb-20">
          <div class="flex items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex-shrink-0">
                  <Flame class="w-4 h-4 sm:w-6 sm:h-6" />
                </span>
                <span class="truncate">{{ $t('explore.hottestFandoms') }}</span>
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ $t('explore.hottestFandomsSubtitle') }}</p>
            </div>
            <router-link to="/login" class="group inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors flex-shrink-0">
              <span class="hidden sm:inline">{{ $t('explore.exploreAll') }}</span>
              <span class="sm:hidden">{{ $t('explore.view') }}</span>
              <i class="fas fa-arrow-right ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform text-xs"></i>
            </router-link>
          </div>
          <div class="flex overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 snap-x snap-mandatory gap-3 sm:gap-5">
            <div v-for="fan in popularFandoms" :key="fan.id" @click.prevent="$router.push('/login')" class="group relative w-48 sm:w-60 lg:w-72 flex-shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-gray-200/70 dark:ring-gray-700 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 snap-start">
              <div class="h-32 sm:h-40 lg:h-44 w-full overflow-hidden relative">
                <img :src="fan.image" :alt="fan.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <span class="inline-block px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg text-xs font-medium">{{ fan.category }}</span>
                </div>
              </div>
              <div class="p-3 sm:p-4 lg:p-5">
                <h4 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">{{ fan.name }}</h4>
                <div class="flex items-center justify-between text-xs sm:text-sm">
                  <div class="flex items-center text-gray-600 dark:text-gray-400">
                    <i class="fas fa-users mr-1 sm:mr-2 text-primary-500 text-xs"></i>
                    <span class="font-semibold">{{ fan.members }}</span>
                    <span class="ml-1 hidden sm:inline">{{ $t('labels.members') }}</span>
                  </div>
            
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Famous People Carousel -->
        <div class="mb-12 sm:mb-16 lg:mb-20">
          <div class="flex items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex-shrink-0">
                  <Star class="w-4 h-4 sm:w-6 sm:h-6" />
                </span>
                <span class="truncate">{{ $t('explore.celebrityHub') }}</span>
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ $t('explore.celebrityHubSubtitle') }}</p>
            </div>
            <router-link to="/login" class="group inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors flex-shrink-0">
              <span class="hidden sm:inline">{{ $t('explore.seeAll') }}</span>
              <span class="sm:hidden">{{ $t('explore.view') }}</span>
              <i class="fas fa-star ml-1 sm:ml-2 group-hover:rotate-12 transition-transform text-xs"></i>
            </router-link>
          </div>
          <div class="flex overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 snap-x snap-mandatory touch-pan-x">
            <div v-for="person in famousPeople" :key="person.id" @click.prevent="$router.push('/login')" class="group relative w-56 sm:w-64 flex-shrink-0 rounded-3xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-gray-200/70 dark:ring-gray-700 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 mr-5 sm:mr-6 last:mr-0 snap-start">
              <div class="h-52 w-full overflow-hidden relative">
                <img :src="person.image" :alt="person.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <h4 class="text-lg font-bold text-white mb-1">{{ person.name }}</h4>
                  <p class="text-xs text-gray-200 opacity-90">{{ person.title }}</p>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <i class="fas fa-heart mr-2 text-pink-500"></i>
                    <span class="font-semibold">{{ person.followers }}</span>
                    <span class="ml-1">{{ $t('labels.fans') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Categories Carousel -->
        <div class="mb-16 sm:mb-20">
          <div class="flex items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <Folder class="w-4 h-4 sm:w-6 sm:h-6" />
                </span>
                <span class="truncate">{{ $t('explore.trendingCategories') }}</span>
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ $t('explore.trendingCategoriesSubtitle') }}</p>
            </div>
            <router-link to="/login" class="group inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors flex-shrink-0">
              <span class="hidden sm:inline">{{ $t('explore.browseAll') }}</span>
              <span class="sm:hidden">{{ $t('explore.view') }}</span>
              <i class="fas fa-th-large ml-1 sm:ml-2 group-hover:scale-110 transition-transform text-xs"></i>
            </router-link>
          </div>
          <div class="flex overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 snap-x snap-mandatory gap-3 sm:gap-5">
            <div v-for="cat in popularCategories" :key="cat.id" @click.prevent="$router.push('/login')" class="group relative w-44 sm:w-52 lg:w-64 flex-shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-gray-200/70 dark:ring-gray-700 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 snap-start">
              <div class="h-28 sm:h-36 lg:h-40 w-full overflow-hidden relative">
                <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <div class="p-3 sm:p-4 lg:p-5">
                <h4 class="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{{ cat.name }}</h4>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{{ cat.description }}</p>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm">
                  <div class="flex items-center text-gray-600 dark:text-gray-400">
                    <i class="fas fa-layer-group mr-1 sm:mr-2 text-indigo-500 text-xs"></i>
                    <span class="font-semibold">{{ cat.subs }}</span>
                    <span class="ml-1 text-[11px] sm:text-sm">{{ $t('labels.fandoms') }}</span>
                  </div>
                  <div class="flex items-center text-emerald-600 dark:text-emerald-400">
                    <i class="fas fa-trending-up mr-1 text-xs"></i>
                    <span class="font-bold">{{ cat.weeklyPosts }}k</span>
                    <span class="ml-1 text-[11px] sm:text-sm">{{ $t('labels.posts') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Latest News Carousel -->
        <div class="mb-12 sm:mb-16 lg:mb-20">
          <div class="flex items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex-shrink-0">
                  <Newspaper class="w-4 h-4 sm:w-6 sm:h-6" />
                </span>
                <span class="truncate">Breaking News</span>
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Stay updated with the latest happenings</p>
            </div>
            <router-link to="/login" class="group inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex-shrink-0">
              <span class="hidden sm:inline">Read More</span>
              <span class="sm:hidden">Read</span>
              <i class="fas fa-newspaper ml-1 sm:ml-2 group-hover:rotate-12 transition-transform text-xs"></i>
            </router-link>
          </div>
          <div class="flex overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 snap-x snap-mandatory">
            <div v-for="news in latestNews" :key="news.id" @click.prevent="$router.push('/login')" class="group relative w-72 sm:w-80 flex-shrink-0 rounded-3xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-gray-200/70 dark:ring-gray-700 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 mr-5 sm:mr-6 last:mr-0 snap-start">
              <div class="h-48 w-full overflow-hidden relative">
                <img :src="news.image" :alt="news.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute top-4 left-4">
                  <span class="inline-block px-2 py-1 bg-red-500 text-white rounded-lg text-xs font-bold uppercase">
                    {{ news.category }}
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <span class="inline-block px-2 py-1 bg-black/40 backdrop-blur-sm text-white rounded-lg text-xs">
                    {{ news.timeAgo }}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{{ news.title }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ news.excerpt }}</p>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center text-gray-600 dark:text-gray-400">
                    <i class="fas fa-eye mr-2 text-blue-500"></i>
                    <span>{{ news.views }} views</span>
                  </div>
                  <div class="flex items-center text-gray-600 dark:text-gray-400">
                    <i class="fas fa-comments mr-2 text-green-500"></i>
                    <span>{{ news.comments }} comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Products Carousel -->
        <div>
          <div class="flex items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div class="flex-1 min-w-0">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
                <span class="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <ShoppingBag class="w-4 h-4 sm:w-6 sm:h-6" />
                </span>
                <span class="truncate">Exclusive Drops</span>
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Limited edition merchandise from your favorite fandoms</p>
            </div>
            <router-link to="/login" class="group inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors flex-shrink-0">
              <span class="hidden sm:inline">Shop Now</span>
              <span class="sm:hidden">Shop</span>
              <i class="fas fa-shopping-bag ml-1 sm:ml-2 group-hover:scale-110 transition-transform text-xs"></i>
            </router-link>
          </div>
          <div class="flex overflow-x-auto no-scrollbar pb-6 -mx-2 px-2 snap-x snap-mandatory">
            <div v-for="product in featuredProducts" :key="product.id" @click.prevent="$router.push('/login')" class="group relative w-60 sm:w-72 flex-shrink-0 rounded-3xl overflow-hidden bg-white dark:bg-gray-800 ring-1 ring-gray-200/70 dark:ring-gray-700 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 mr-5 sm:mr-6 last:mr-0 snap-start">
              <div class="h-48 w-full overflow-hidden relative">
                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div class="absolute top-4 left-4">
                  <span v-if="product.discount" class="inline-block px-2 py-1 bg-red-500 text-white rounded-lg text-xs font-bold">
                    -{{ product.discount }}%
                  </span>
                  <span v-else-if="product.isNew" class="inline-block px-2 py-1 bg-green-500 text-white rounded-lg text-xs font-bold">
                    NEW
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <button class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <i class="fas fa-heart text-sm"></i>
                  </button>
                </div>
              </div>
              <div class="p-5">
                <div class="flex items-center mb-2">
                  <div class="flex items-center space-x-1 mr-2">
                    <div v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'">
                      <i class="fas fa-star text-xs"></i>
                    </div>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">({{ product.reviews }})</span>
                </div>
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{{ product.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ product.category }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">${{ product.originalPrice }}</span>
                    <span class="text-xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <i class="fas fa-box mr-1 text-orange-500"></i>
                    <span>{{ product.stock }} left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              {{ $t('landing.footer.description') }}
            </p>
          </div>
          <div class="space-y-4">
            <h3 class="font-bold text-lg capitalize">{{ $t('landing.footer.nav.product.title') }}</h3>
            <ul class="space-y-3">
              <li v-for="item in footerNavigation.product" :key="item.name">
                <a :href="item.href" class="text-gray-400 hover:text-white transition-colors">{{ $t(item.i18n) }}</a>
              </li>
            </ul>
          </div>
          <div class="space-y-4">
            <h3 class="font-bold text-lg capitalize">{{ $t('landing.footer.nav.company.title') }}</h3>
            <ul class="space-y-3">
              <li v-for="item in footerNavigation.company" :key="item.name">
                <a :href="item.href" class="text-gray-400 hover:text-white transition-colors">{{ $t(item.i18n) }}</a>
              </li>
            </ul>
          </div>
          <div class="space-y-4">
            <h3 class="font-bold text-lg capitalize">{{ $t('landing.footer.nav.social.title') }}</h3>
            <ul class="space-y-3">
              <li v-for="item in footerNavigation.social" :key="item.name">
                <a :href="item.href" class="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">
                  <component :is="item.icon" class="w-5 h-5" />
                  <span>{{ item.name }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400">&copy; 2025 FanRadar. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useThemeStore } from '@/store/index'
import { useTrendsStore } from '@/store/trends'
import { Facebook, Flame, Folder, Globe, Heart, Instagram, Linkedin, LogIn, MessageCircle, Newspaper, Shield, ShoppingBag, Star, TrendingUp, Twitter, UserPlus, Users, Zap } from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LandingPage',
  components: { Users, MessageCircle, Star, Heart, TrendingUp, Zap, Globe, Shield, Twitter, Facebook, Instagram, Linkedin, LogIn, UserPlus, Folder, Flame, Newspaper, ShoppingBag },
  setup() {
    const themeStore = useThemeStore()
    const isDark = computed(() => themeStore.isDark)
    const toggleTheme = () => { themeStore.toggleTheme() }

    const { locale: i18nLocale, t } = useI18n()
    const locale = ref(typeof localStorage !== 'undefined' ? (localStorage.getItem('locale') || i18nLocale.value) : i18nLocale.value)
    const onChangeLocale = () => {
      i18nLocale.value = locale.value
      try { if (typeof localStorage !== 'undefined') localStorage.setItem('locale', locale.value) } catch {}
      if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', locale.value)
    }

    const languages = [ { code: 'en', region: 'US', label: 'English' }, { code: 'fr', region: 'FR', label: 'Français' } ]
    const isLangOpen = ref(false)
    const langWrapperRef = ref(null)
    const currentLocaleShort = computed(() => (locale.value || 'en').toUpperCase())
    const toggleLangOpen = () => { isLangOpen.value = !isLangOpen.value }
    const selectLanguage = (code) => { locale.value = code; onChangeLocale(); isLangOpen.value = false }
    const onClickOutside = (e) => { if (!langWrapperRef.value) return; if (!langWrapperRef.value.contains(e.target)) isLangOpen.value = false }
    onMounted(() => { if (typeof document !== 'undefined') document.addEventListener('click', onClickOutside) })
    onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('click', onClickOutside) })

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

    // Mock Data: Popular Fandoms
    const popularFandoms = ref([
      { id: 1, name: 'GOAT Football Fans', category: 'Sports', members: '980k', trending: 99, growth: 48, activeNow: '54.2k', image: 'https://www.thesun.co.uk/wp-content/uploads/2022/10/DD-COMP-TOP-10-BEST-OF-ALL-TIME.jpg?w=620' },
      { id: 2, name: 'Swiftie Soundwaves', category: 'Music', members: '620k', trending: 93, growth: 37, activeNow: '21.4k', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoWJ1ZcZBswHmQ8XuLbrCZlkqENZkwbpBx4A&s' },
      { id: 3, name: 'Next-Gen Tech Titans', category: 'Tech', members: '455k', trending: 88, growth: 24, activeNow: '15.1k', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60' },
      { id: 4, name: 'Global Politics Pulse', category: 'News', members: '310k', trending: 72, growth: 12, activeNow: '8.6k', image: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=800&q=60' },
      { id: 5, name: 'Esports Champions Hub', category: 'eSports', members: '540k', trending: 91, growth: 33, activeNow: '26.7k', image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=800&q=60' },
      { id: 6, name: 'Cinematic Multiverse', category: 'Movies', members: '405k', trending: 79, growth: 19, activeNow: '11.2k', image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=60' },
    ])

    // Mock Data: Famous People
    const famousPeople = ref([
      { id: 1, name: 'Cristiano Ronaldo', title: 'Football Icon • Forward', followers: '620M', activity: 95, rating: 5, postsThisWeek: 7, image: 'https://assets-fr.imgfoot.com/media/cache/642x382/cristiano-ronaldo-al-nassr.jpg' },
      { id: 2, name: 'Lionel Messi', title: 'World Champion • Playmaker', followers: '490M', activity: 91, rating: 5, postsThisWeek: 6, image: 'https://hips.hearstapps.com/hmg-prod/images/lionel-messi-celebrates-after-their-sides-third-goal-by-news-photo-1686170172.jpg?crop=0.66653xw:1xh;center,top&resize=640:*' },
      { id: 3, name: 'Taylor Swift', title: 'Global Music Phenomenon', followers: '310M', activity: 89, rating: 5, postsThisWeek: 9, image: 'https://imagenes.elpais.com/resizer/v2/AWNTN6VH5NFBPJYRX7DS6QAAMM.jpg?auth=1426161ce83c0dc66a4185ca80b7f19eeff59f2e1ea63dd2a803a2e8a4417824&width=980&height=980&smart=true' },
      { id: 4, name: 'Elon Musk', title: 'Tech & Space Visionary', followers: '180M', activity: 76, rating: 4, postsThisWeek: 14, image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Elon_Musk_Royal_Society_crop.jpg' },
      { id: 5, name: 'Donald Trump', title: 'Business & Media Personality', followers: '95M', activity: 63, rating: 3, postsThisWeek: 4, image: 'https://external-preview.redd.it/brace-yourselves-whatever-crazy-awful-things-trump-may-have-v0-MtdNO2ga29HMAywyU27Eezn9IXAf4TXH5dZQgK2bPTU.jpg?width=1080&crop=smart&auto=webp&s=a2f6aae172c5d51b99c22f62cc89c324fa7b4c83' },
    ])

    // Mock Data: Popular Categories
    const popularCategories = ref([
      { id: 1, name: 'Science Fiction', description: 'Explore galaxies, futuristic tech & cosmic lore.', subs: '4.3k', growth: 32, weeklyPosts: '2.8', image: 'https://images.newscientist.com/wp-content/uploads/2025/04/02134051/sei246019051.jpg' },
      { id: 2, name: 'Motorsports', description: 'For speed addicts & engineering minds.', subs: '2.9k', growth: 21, weeklyPosts: '1.5', image: 'https://images.squarespace-cdn.com/content/v1/5d409ef64557bc0001566cb9/1615475709851-TTPJVO5JZVV8KBFV6I7L/DSC_4503.jpg' },
      { id: 3, name: 'Fantasy Worlds', description: 'Magic, dragons, and epic quests await.', subs: '3.6k', growth: 27, weeklyPosts: '2.1', image: 'https://wallpapers.com/images/featured/fantasy-world-kgck2z03z942tmt4.jpg' },
      { id: 4, name: 'eSports', description: 'Tournaments, teams & competitive meta.', subs: '5.1k', growth: 45, weeklyPosts: '4.2', image: 'https://ips.insight.com/content/dam/insight-web/en_US/public-sector/homepage/hero/esports-technology-lifestyle-hero.jpg' },
      { id: 5, name: 'Indie Games', description: 'Creativity-driven pixel & narrative gems.', subs: '1.7k', growth: 18, weeklyPosts: '0.9', image: 'https://images-rsg.storage.googleapis.com/wp-content/uploads/2025/05/How-to-Achieve-Success-for-Your-Indie-Game.jpg' },
      { id: 6, name: 'Pop Culture', description: 'TV, music, trends and global icons.', subs: '6.8k', growth: 39, weeklyPosts: '5.1', image: 'https://www.hopono-shop.com/cdn/shop/articles/1747661727.jpg?v=1747661730' },
    ])

        // Mock Data: Featured Products (trend & persona inspired)
    const featuredProducts = ref([
      { id: 1, name: 'Signature CR7 Match Ball (Replica)', category: 'Sports Gear', price: 129.99, originalPrice: 169.99, discount: 24, rating: 5, reviews: 512, stock: 18, isNew: false, image: 'https://i.ebayimg.com/images/g/rRkAAOSwKaFjmPsM/s-l1200.jpg' },
      { id: 2, name: 'GOAT Limited Edition Jersey 2025', category: 'Apparel', price: 189.99, originalPrice: 229.99, discount: 17, rating: 5, reviews: 764, stock: 9, isNew: true, image: 'https://footballmonk.in/wp-content/uploads/2024/01/Portugal-Goat-The-Sui-Special-Edition-Black-Jersey-1.jpg' },
      { id: 3, name: 'Global Tour Fan Bracelet Pack', category: 'Merch', price: 39.99, originalPrice: null, discount: null, rating: 4, reviews: 221, stock: 46, isNew: true, image: 'https://i.etsystatic.com/24201774/r/il/d051ce/6206410800/il_570xN.6206410800_lbrp.jpg' },
      { id: 4, name: 'Tech Visionary Model Rocket Kit', category: 'Collectibles', price: 59.99, originalPrice: 79.99, discount: 25, rating: 4, reviews: 188, stock: 22, isNew: false, image: 'https://5.imimg.com/data5/SELLER/Default/2025/7/524861550/JF/KQ/NC/185277227/rocket-model-diy-kit-stem-500x500.jpeg' },
      { id: 5, name: 'Gold Edition Leadership Coin', category: 'Collectibles', price: 74.99, originalPrice: 99.99, discount: 25, rating: 3, reviews: 93, stock: 30, isNew: false, image: 'https://www.americanmint.com/media/image/5e/bc/6e/1712050-514KQl4Gh1Ne40T_600x600.jpg' },
    ])

    // Mock Data: Latest News
    const latestNews = ref([
      { id: 1, title: 'Major Gaming Tournament Announces $2M Prize Pool', excerpt: 'The biggest eSports event of the year just got bigger with unprecedented prize money and celebrity endorsements.', category: 'ESPORTS', timeAgo: '2 hours ago', views: '45.2k', comments: '892', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=60' },
      { id: 2, title: 'Sci-Fi Blockbuster Breaks Opening Weekend Records', excerpt: 'The latest space odyssey film has shattered box office expectations worldwide, setting new standards for the genre.', category: 'MOVIES', timeAgo: '5 hours ago', views: '67.8k', comments: '1.2k', image: 'https://static0.moviewebimages.com/wordpress/wp-content/uploads/2024/06/20-movies-with-the-biggest-opening-weekends-at-the-box-office.jpg?w=1600&h=1200&fit=crop' },
      { id: 3, title: 'K-Pop Group Announces Global Tour Dates', excerpt: 'Fans worldwide are ecstatic as the chart-topping group reveals their most ambitious world tour yet with 50+ cities.', category: 'MUSIC', timeAgo: '1 day ago', views: '128.5k', comments: '3.4k', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=60' },
      { id: 4, title: 'New Gaming Console Features Revealed', excerpt: 'Tech enthusiasts are buzzing about revolutionary features that could change gaming forever.', category: 'TECH', timeAgo: '2 days ago', views: '91.3k', comments: '2.1k', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=60' },
    ])



    const trendsStore = useTrendsStore()
    const trendingCommunities = computed(() => trendsStore.trendingCommunities.slice(0, 8))
    onMounted(() => { trendsStore.fetchTrendingFandoms(8).catch(() => {}) })

    const faqs = computed(() => [
      { q: t('faq.items.whatIs.q'), a: t('faq.items.whatIs.a') },
      { q: t('faq.items.isFree.q'), a: t('faq.items.isFree.a') },
      { q: t('faq.items.howJoin.q'), a: t('faq.items.howJoin.a') },
    ])

    const footerNavigation = {
      product: [
        { name: 'Features', i18n: 'landing.footer.nav.product.features', href: '#features' },
        { name: 'Trending', i18n: 'landing.footer.nav.product.trending', href: '#communities' },
        { name: 'FAQ', i18n: 'landing.footer.nav.product.faq', href: '#faq' },
      ],
      company: [
        { name: 'About', i18n: 'landing.footer.nav.company.about', href: '#' },
        { name: 'Contact', i18n: 'landing.footer.nav.company.contact', href: '#' },
        { name: 'Careers', i18n: 'landing.footer.nav.company.careers', href: '#' },
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
      languages,
      isLangOpen,
      toggleLangOpen,
      selectLanguage,
      currentLocaleShort,
      langWrapperRef,
      stats,
      howItWorks,
      features,
      popularFandoms,
      famousPeople,
      popularCategories,
      latestNews,
      featuredProducts,
      trendingCommunities,
      faqs,
      footerNavigation,
      t,
    }
  }
}
</script>
<style>
/* Hide scrollbars for horizontal carousels on this page */
.no-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}
.no-scrollbar::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none; /* Chrome, Safari */
}

/* Enhanced mobile touch scrolling */
@media (max-width: 640px) {
  .snap-x {
    scroll-behavior: smooth;
  }
  
  /* Improve touch targets on mobile */
  .group {
    min-height: 44px; /* iOS recommendation */
  }
  
  /* Better mobile card spacing */
  .snap-start {
    scroll-margin-left: 1rem;
  }
}
</style>