import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    header: {
      signIn: 'Sign In',
      signUp: 'Sign up',
      language: 'Language'
    },
    hero: {
      titleBefore: 'Where',
      titleAfter: 'Come Alive',
      subtitle: 'Connect with millions of passionate fans, discover new fandoms, and dive deep into the worlds you love most.',
      ctaPrimary: 'Join a Fandom',
      ctaSecondary: 'Explore Fandoms',
      teaser: 'No spam. No noise. Just your fandom — organized.'
    },
    stats: {
      activeUsers: 'Active Users',
      fandoms: 'Fandoms',
      dailyPosts: 'Daily Posts',
      countries: 'Countries'
    },
    howItWorks: {
      title: 'How FanRadar Works',
      subtitle: 'Three simple steps to find your people and start engaging today.',
      steps: {
        discover: {
          title: 'Discover',
          desc: 'Browse trending topics or search any universe, sport, artist, or game you love.'
        },
        join: {
          title: 'Join',
          desc: 'Follow fandoms and creators, tailor your feed, and meet fans just like you.'
        },
        engage: {
          title: 'Engage',
          desc: 'Post, vote in polls, and share moments — all in one place.'
        }
      }
    },
    features: {
      titleBefore: 'Everything You Need to',
      titleHighlight: 'Connect',
      subtitle: 'Powerful tools that make it easy to discover, share, and connect with your fandom.',
      items: {
        discussions: {
          name: 'Discussions',
          desc: 'Start discussions and comment on posts tailored to your interests.'
        },
        smartFandoms: {
          name: 'Smart Fandoms',
          desc: 'Personalized recommendations help you discover communities you’ll actually love.'
        },
        globalReach: {
          name: 'Global Reach',
          desc: 'Join a worldwide network of fans and creators across every genre and niche.'
        },
        safeEnvironment: {
          name: 'Safe Environment',
          desc: 'Human + AI moderation keeps conversations respectful, welcoming, and on-topic.'
        },
        trendingContent: {
          name: 'Trending Content',
          desc: 'See what’s buzzing now with real‑time trends, highlights, and curated picks.'
        },
        fanEvents: {
          name: 'Fan Events',
          desc: 'Join exclusive AMAs, watch parties, and community events — online and IRL.'
        }
      }
    },
    trending: {
      titlePrefix: 'Trending',
      title: 'Trending on FanRadar',
      subtitle: 'Join millions of fans in these vibrant fandoms where passion meets connection.',
      explore: 'Explore All Fandoms',
      exploreAll: 'Explore All Fandoms'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about getting started with FanRadar.'
    },
    cta: {
      title: 'Ready to Join the Revolution?',
      subtitle: 'Connect with your fandom, discover new passions, and be part of something bigger.',
      primary: 'Start Your Journey',
      secondary: 'Learn More'
    },
    routes: {
      home: 'Home',
      dashboard: 'Dashboard',
      explore: 'Explore',
      news: 'News',
      category: 'Category',
      hashtag: 'Hashtag',
      search: 'Search',
      fandoms: 'Fandoms',
      account: 'Account',
      editAccount: 'Edit Account',
      mart: 'Store',
      productSearch: 'Product Search',
      cart: 'Cart',
      orders: 'Orders',
      orderDetails: 'Order Details',
      createFandom: 'Create Fandom',
      fandomDetail: 'Fandom',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      chooseCategories: 'Choose Categories'
    },
    auth: {
      signIn: {
        title: 'Welcome Back',
        subtitle: 'Sign in to your FanRadar account',
        withGoogle: 'Sign in with Google',
        or: 'or',
        emailLabel: 'Email',
        emailPlaceholder: 'Enter your email',
        passwordLabel: 'Password',
        passwordPlaceholder: '••••••••',
        forgot: 'Forgot password?',
        submit: 'Sign In',
        submitting: 'Signing In...',
        noAccount: "Don't have an account?",
        signUpLink: 'Sign up',
        errors: {
          missingFields: 'Please enter both email and password',
          loginFailed: 'Login failed. Please try again.',
          unexpected: 'An unexpected error occurred'
        }
      },
      signUp: {
        title: 'Join FanRadar',
        subtitle: 'Create your account to get started',
        withGoogle: 'Sign up with Google',
        or: 'or',
        username: 'Username',
        email: 'Email',
        age: 'Age',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        password: 'Password',
        createAccount: 'Create Account',
        alreadyHave: 'Already have an account?',
        signInLink: 'Sign in',
        placeholders: {
          username: 'Enter your username',
          email: 'Enter your email',
          age: 'Enter your age',
          password: '••••••••'
        }
      },
      chooseCategories: {
        title: 'Pick your favorite categories',
        description: 'Select up to {max} categories you love to personalize your experience.',
        continue: 'Continue',
        selectMore: 'Select {count} more to continue',
        greatChoices: 'Great choices! Ready to go'
      }
    },
    common: {
      posts: 'Posts',
      news: 'News',
      fandoms: 'Fandoms',
      people: 'People',
      followers: 'Followers',
      following: 'Following',
      follow: 'Follow',
      followingVerb: 'Following',
      join: 'Join',
      joinFandom: 'Join Fandom',
      leaveFandom: 'Leave Fandom',
      seeAll: 'See all',
      showMore: 'Show more',
      search: 'Search',
      searchResultsFor: 'Search Results for "{q}"',
      foundResultsSummary: 'Found {count} results across posts, people, news, and fandoms',
      noResults: 'No results found',
      tryAnotherSearch: 'Try searching for something else',
      loading: 'Loading...',
      loadMore: 'Load More',
      loadMorePosts: 'Load More Posts',
      addToCart: 'Add to Cart',
      previous: 'Previous',
      next: 'Next',
      category: 'Category',
      categories: 'Categories',
      brand: 'Brand',
      priceRange: 'Price Range',
      sortBy: 'Sort By',
      results: 'Results',
      clearFilters: 'Clear Filters',
      clearAllFilters: 'Clear All Filters',
      activeFilters: 'Active Filters',
      applied: 'applied',
      postsCount: '{count} posts',
      members: 'members',
      online: 'online',
      hashtags: 'hashtags',
      views: 'views',
      read: 'read',
      breakingNews: 'Breaking News',
      breaking: 'Breaking',
      timeline: 'Timeline',
      trending: 'Trending',
      followingFeed: 'Following',
      image: 'Image',
      video: 'Video',
      post: 'Post',
      noPostsYet: 'No posts yet',
      followSomeFandoms: 'Follow some fandoms to see posts in your timeline!',
      exploreFandoms: 'Explore Fandoms',
      trendingFandoms: 'Trending Fandoms',
      trendingHashtags: 'Trending Hashtags',
      discoverFandoms: 'Discover Fandoms',
      discoverContent: 'Discover Content',
      trendsNewsFandomsForYou: 'Trends, news and fandoms for you',
      currentTrends: 'Current Trends',
      popularCategories: 'Popular Categories',
      fanNews: 'Fan News',
      selectMoreToContinue: 'Select {count} more to continue',
      greatChoicesReady: 'Great choices! Ready to go',
      continue: 'Continue',
      editProfile: 'Edit Profile',
      userNotFound: 'User not found',
      goToDashboard: 'Go to Dashboard',
      editFandom: 'Edit Fandom',
      manageMembers: 'Manage Members',
      editRules: 'Edit Rules',
      editHashtags: 'Edit Hashtags',
      adminPanel: 'Admin Panel',
      youreMember: "You're a member of this fandom!",
      addMember: 'Add Member',
      addNewMember: 'Add New Member',
      remove: 'Remove',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      contentComingSoon: 'Content Coming Soon',
      sectionUnderDevelopment: 'This section is currently under development.',
      createFandom: 'Create Fandom',
      loadMoreFandoms: 'Load More Fandoms',
      clearFiltersCta: 'Clear Filters',
      createAFandom: 'Create a Fandom',
      whatsOnYourMind: "What's on your mind?",
      addTagsPlaceholder: 'Add tags (press Enter or Tab)...'
    },
    content: {
      news: {
        subtitle: 'Stay updated with the latest news from all your favorite fandoms',
        filters: {
          all: 'All Categories',
          breaking: 'Breaking News',
          gaming: 'Gaming',
          sports: 'Sports',
          entertainment: 'Entertainment',
          technology: 'Technology'
        },
        sort: {
          recent: 'Most Recent',
          popular: 'Most Popular',
          trending: 'Trending'
        },
        loadMore: 'Load More News',
        emptyTitle: 'No news found',
        emptyDesc: 'Try adjusting your filters or check back later for new updates.'
      },
      home: {
        newsToday: 'News Today'
      },
      category: {
        label: 'Category',
        communities: 'communities',
        members: 'members',
        tabs: {
          fandoms: 'Fandoms',
          posts: 'Posts',
          news: 'News'
        },
        empty: {
          fandoms: 'No fandoms found for this category.',
          posts: 'No posts found for this category.',
          news: 'No news found for this category.'
        }
      },
      hashtag: {
        label: 'Hashtag',
        growthThisWeek: 'growth this week',
        tabs: {
          posts: 'Posts',
          news: 'News',
          related: 'Related'
        },
        empty: {
          posts: 'No posts found for this hashtag.',
          news: 'No news found for this hashtag.',
          related: 'No related hashtags found.'
        },
        noHashtagsYet: 'No hashtags yet'
      },
      search: {
        header: 'Search Results for "{q}"',
        summary: 'Found {count} results across posts, people, news, and fandoms'
      }
    },
    fandom: {
      list: {
        title: 'Discover Fandoms',
        subtitle: 'Find your people and explore shared interests',
        searchPlaceholder: 'Search fandoms...'
      },
      detail: {
        label: 'Fandom',
        members: 'members',
        online: 'online',
        joinTitle: 'Join {name}',
        joinSubtitle: 'Connect with {members} passionate fans and never miss an update!',
        memberWelcome: "You're a member of this fandom!",
        trendingHashtags: 'Trending Hashtags',
        hashtagsCount: '{count} hashtags',
        tabs: {
          posts: 'Posts',
          members: 'Members',
          about: 'About'
        },
        createPostPlaceholderAdmin: 'Share an announcement or post with the fandom...',
        createPostPlaceholderMember: 'Share something with the fandom...',
        pinPost: 'Pin Post',
        announcement: 'Announcement',
        postAnnouncement: 'Post Announcement',
        post: 'Post',
        adminPanel: 'Admin Panel',
        editFandom: 'Edit Fandom',
        manageMembers: 'Manage Members',
        editRules: 'Edit Rules',
        editHashtags: 'Edit Hashtags',
        addNewMember: 'Add New Member',
        addMember: 'Add Member',
        member: 'Member',
        mod: 'Mod',
        saveChanges: 'Save Changes',
        saveRules: 'Save Rules',
        cancel: 'Cancel'
      }
    },
    account: {
      editProfile: 'Edit Profile',
      posts: 'Posts',
      followers: 'Followers',
      following: 'Following',
      myFandoms: 'My Fandoms',
      saved: 'Saved',
      empty: {
        noPostsYet: 'No posts yet',
        sharePrompt: 'Share your thoughts with the world!',
        userHasNoPosts: "{name} hasn't shared anything yet.",
        noFollowers: 'No followers yet',
        followersHint: "When people follow you, they'll appear here.",
        notFollowingAnyone: 'Not following anyone',
        findPeople: 'Find interesting people to follow.',
        noSavedPosts: 'No saved posts',
        savedHint: 'Posts you save will appear here.',
        noFandomsJoined: 'No fandoms joined yet',
        joinAFandomHint: 'Join a fandom to see it here.'
      },
      notFound: {
        title: 'User not found',
        description: "The profile you're looking for doesn't exist.",
        goToDashboard: 'Go to Dashboard'
      }
    },
    store: {
      mart: {
        hotDrops: 'Hot Drops',
        hotDropsSubtitle: 'Limited-time exclusive releases',
        dontMissOut: "Don't miss out!",
        endsIn: 'Ends in',
        stockLevel: 'Stock Level',
        claimThisDrop: 'Claim This Drop',
        viewDrop: 'View Drop',
        noProductsTitle: 'No products found',
        noProductsDesc: 'Try adjusting your filters to see more products',
        results: 'Results'
      },
      productSearch: {
        productsFound: '{count} products found',
        sortBy: 'Sort by:',
        loadingProducts: 'Loading products...',
        noProductsTitle: 'No products found',
        noProductsDesc: 'Try adjusting your search criteria or removing some filters'
      },
      sortOptions: {
        relevance: 'Relevance',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        rating: 'Customer Rating',
        newest: 'Newest'
      }
    }
  },
  fr: {
    header: {
      signIn: 'Se connecter',
      signUp: 'S’inscrire',
      language: 'Langue'
    },
    hero: {
      titleBefore: 'Où',
      titleAfter: 'prennent vie',
      subtitle: 'Connectez‑vous avec des millions de fans passionnés, découvrez de nouveaux fandoms et plongez dans les univers que vous aimez.',
      ctaPrimary: 'Rejoindre un fandom',
      ctaSecondary: 'Explorer les fandoms',
      teaser: 'Pas de spam. Pas de bruit. Juste votre fandom — organisé.'
    },
    stats: {
      activeUsers: 'Utilisateurs actifs',
      fandoms: 'Fandoms',
      dailyPosts: 'Publications quotidiennes',
      countries: 'Pays'
    },
    howItWorks: {
      title: 'Comment fonctionne FanRadar',
      subtitle: 'Trois étapes simples pour trouver votre communauté et commencer à échanger.',
      steps: {
        discover: {
          title: 'Découvrir',
          desc: 'Parcourez les tendances ou recherchez n’importe quel univers, sport, artiste ou jeu que vous aimez.'
        },
        join: {
          title: 'Rejoindre',
          desc: 'Suivez des fandoms et des créateurs, personnalisez votre fil et rencontrez des fans comme vous.'
        },
        engage: {
          title: 'Interagir',
          desc: 'Publiez, votez dans des sondages et partagez des moments — au même endroit.'
        }
      }
    },
    features: {
      titleBefore: 'Tout ce dont vous avez besoin pour',
      titleHighlight: 'connecter',
      subtitle: 'Des outils puissants pour découvrir, partager et vous connecter à votre fandom.',
      items: {
        discussions: {
          name: 'Discussions',
          desc: 'Lancez des discussions et commentez des posts adaptés à vos centres d’intérêt.'
        },
        smartFandoms: {
          name: 'Fandoms intelligents',
          desc: 'Des recommandations personnalisées pour découvrir des communautés que vous aimerez vraiment.'
        },
        globalReach: {
          name: 'Portée mondiale',
          desc: 'Rejoignez un réseau mondial de fans et de créateurs, tous genres confondus.'
        },
        safeEnvironment: {
          name: 'Environnement sûr',
          desc: 'Une modération humaine + IA pour des échanges respectueux et accueillants.'
        },
        trendingContent: {
          name: 'Contenu tendance',
          desc: 'Découvrez ce qui fait le buzz avec des tendances en temps réel et des sélections.'
        },
        fanEvents: {
          name: 'Évènements fans',
          desc: 'Participez à des AMAs, watch parties et événements — en ligne et en personne.'
        }
      }
    },
    trending: {
      titlePrefix: 'Populaires',
      title: 'Populaires sur FanRadar',
      subtitle: 'Rejoignez des millions de fans dans ces fandoms dynamiques où la passion rencontre la connexion.',
      explore: 'Explorer tous les fandoms',
      exploreAll: 'Explorer tous les fandoms'
    },
    faq: {
      title: 'Questions fréquentes',
      subtitle: 'Tout ce qu’il faut savoir pour bien démarrer sur FanRadar.'
    },
    cta: {
      title: 'Prêt à rejoindre la révolution ?',
      subtitle: 'Connectez‑vous à votre fandom, découvrez de nouvelles passions et faites partie de quelque chose de plus grand.',
      primary: 'Commencer',
      secondary: 'En savoir plus'
    },
    routes: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      explore: 'Explorer',
      news: 'Actualités',
      category: 'Catégorie',
      hashtag: 'Hashtag',
      search: 'Recherche',
      fandoms: 'Fandoms',
      account: 'Compte',
      editAccount: 'Modifier le compte',
      mart: 'Boutique',
      productSearch: 'Recherche de produits',
      cart: 'Panier',
      orders: 'Commandes',
      orderDetails: 'Détails de la commande',
      createFandom: 'Créer un fandom',
      fandomDetail: 'Fandom',
      signIn: 'Se connecter',
      signUp: 'S’inscrire',
      chooseCategories: 'Choisir des catégories'
    },
    auth: {
      signIn: {
        title: 'Bon retour',
        subtitle: 'Connectez-vous à votre compte FanRadar',
        withGoogle: 'Se connecter avec Google',
        or: 'ou',
        emailLabel: 'E-mail',
        emailPlaceholder: 'Entrez votre e-mail',
        passwordLabel: 'Mot de passe',
        passwordPlaceholder: '••••••••',
        forgot: 'Mot de passe oublié ?',
        submit: 'Se connecter',
        submitting: 'Connexion... ',
        noAccount: 'Vous n’avez pas de compte ?',
        signUpLink: 'S’inscrire',
        errors: {
          missingFields: 'Veuillez saisir l’e-mail et le mot de passe',
          loginFailed: 'Échec de la connexion. Veuillez réessayer.',
          unexpected: 'Une erreur inattendue est survenue'
        }
      },
      signUp: {
        title: 'Rejoindre FanRadar',
        subtitle: 'Créez votre compte pour commencer',
        withGoogle: 'S’inscrire avec Google',
        or: 'ou',
        username: "Nom d’utilisateur",
        email: 'E‑mail',
        age: 'Âge',
        gender: 'Genre',
        male: 'Homme',
        female: 'Femme',
        password: 'Mot de passe',
        createAccount: 'Créer un compte',
        alreadyHave: 'Vous avez déjà un compte ?',
        signInLink: 'Se connecter',
        placeholders: {
          username: "Entrez votre nom d’utilisateur",
          email: 'Entrez votre e‑mail',
          age: 'Entrez votre âge',
          password: '••••••••'
        }
      },
      chooseCategories: {
        title: 'Choisissez vos catégories préférées',
        description: 'Sélectionnez jusqu’à {max} catégories pour personnaliser votre expérience.',
        continue: 'Continuer',
        selectMore: 'Sélectionnez encore {count} pour continuer',
        greatChoices: 'Excellents choix ! On y va'
      }
    },
    common: {
      posts: 'Publications',
      news: 'Actualités',
      fandoms: 'Fandoms',
      people: 'Personnes',
      followers: 'Abonnés',
      following: 'Abonnements',
      follow: 'Suivre',
      followingVerb: 'Abonné',
      join: 'Rejoindre',
      joinFandom: 'Rejoindre le fandom',
      leaveFandom: 'Quitter le fandom',
      seeAll: 'Tout voir',
      showMore: 'Voir plus',
      search: 'Rechercher',
      searchResultsFor: 'Résultats de recherche pour « {q} »',
      foundResultsSummary: 'Trouvé {count} résultats dans les publications, personnes, actualités et fandoms',
      noResults: 'Aucun résultat',
      tryAnotherSearch: 'Essayez une autre recherche',
      loading: 'Chargement…',
      loadMore: 'Voir plus',
      loadMorePosts: 'Voir plus de publications',
      addToCart: 'Ajouter au panier',
      previous: 'Précédent',
      next: 'Suivant',
      category: 'Catégorie',
      categories: 'Catégories',
      brand: 'Marque',
      priceRange: 'Fourchette de prix',
      sortBy: 'Trier par',
      results: 'Résultats',
      clearFilters: 'Effacer les filtres',
      clearAllFilters: 'Tout effacer',
      activeFilters: 'Filtres actifs',
      applied: 'appliqué(s)',
      postsCount: '{count} publications',
      members: 'membres',
      online: 'en ligne',
      hashtags: 'hashtags',
      views: 'vues',
      read: 'lecture',
      breakingNews: 'Dernière minute',
      breaking: 'Alerte',
      timeline: 'Fil',
      trending: 'Tendances',
      followingFeed: 'Abonnements',
      image: 'Image',
      video: 'Vidéo',
      post: 'Publier',
      noPostsYet: 'Pas encore de publications',
      followSomeFandoms: 'Suivez des fandoms pour voir des publications dans votre fil !',
      exploreFandoms: 'Explorer les fandoms',
      trendingFandoms: 'Fandoms populaires',
      trendingHashtags: 'Hashtags populaires',
      discoverFandoms: 'Découvrir des fandoms',
      discoverContent: 'Découvrir du contenu',
      trendsNewsFandomsForYou: 'Tendances, actualités et fandoms pour vous',
      currentTrends: 'Tendances actuelles',
      popularCategories: 'Catégories populaires',
      fanNews: 'Actualités des fans',
      selectMoreToContinue: 'Sélectionnez encore {count} pour continuer',
      greatChoicesReady: 'Excellents choix ! On y va',
      continue: 'Continuer',
      editProfile: 'Modifier le profil',
      userNotFound: 'Utilisateur introuvable',
      goToDashboard: 'Aller au tableau de bord',
      editFandom: 'Modifier le fandom',
      manageMembers: 'Gérer les membres',
      editRules: 'Modifier les règles',
      editHashtags: 'Modifier les hashtags',
      adminPanel: 'Panneau admin',
      youreMember: 'Vous êtes membre de ce fandom !',
      addMember: 'Ajouter un membre',
      addNewMember: 'Ajouter un membre',
      remove: 'Supprimer',
      saveChanges: 'Enregistrer',
      cancel: 'Annuler',
      contentComingSoon: 'Contenu bientôt disponible',
      sectionUnderDevelopment: 'Cette section est en cours de développement.',
      createFandom: 'Créer un fandom',
      loadMoreFandoms: 'Afficher plus de fandoms',
      clearFiltersCta: 'Effacer les filtres',
      createAFandom: 'Créer un fandom',
      whatsOnYourMind: 'Qu’avez‑vous en tête ?',
      addTagsPlaceholder: 'Ajoutez des tags (Entrée ou Tab)…'
    },
    content: {
      news: {
        subtitle: 'Restez informé des dernières actualités de vos fandoms préférés',
        filters: {
          all: 'Toutes les catégories',
          breaking: 'Dernière minute',
          gaming: 'Jeux vidéo',
          sports: 'Sports',
          entertainment: 'Divertissement',
          technology: 'Technologie'
        },
        sort: {
          recent: 'Plus récentes',
          popular: 'Plus populaires',
          trending: 'Tendances'
        },
        loadMore: 'Voir plus d’actualités',
        emptyTitle: 'Aucune actualité',
        emptyDesc: 'Ajustez vos filtres ou revenez plus tard pour de nouvelles mises à jour.'
      },
      home: {
        newsToday: 'Actualités du jour'
      },
      category: {
        label: 'Catégorie',
        communities: 'communautés',
        members: 'membres',
        tabs: {
          fandoms: 'Fandoms',
          posts: 'Publications',
          news: 'Actualités'
        },
        empty: {
          fandoms: 'Aucun fandom trouvé pour cette catégorie.',
          posts: 'Aucune publication trouvée pour cette catégorie.',
          news: 'Aucune actualité pour cette catégorie.'
        }
      },
      hashtag: {
        label: 'Hashtag',
        growthThisWeek: 'de croissance cette semaine',
        tabs: {
          posts: 'Publications',
          news: 'Actualités',
          related: 'Liés'
        },
        empty: {
          posts: 'Aucune publication trouvée pour ce hashtag.',
          news: 'Aucune actualité pour ce hashtag.',
          related: 'Aucun hashtag lié.'
        },
        noHashtagsYet: 'Pas encore de hashtags'
      },
      search: {
        header: 'Résultats de recherche pour « {q} »',
        summary: 'Trouvé {count} résultats dans les publications, personnes, actualités et fandoms'
      }
    },
    fandom: {
      list: {
        title: 'Découvrir des fandoms',
        subtitle: 'Trouvez votre communauté et explorez vos centres d’intérêt',
        searchPlaceholder: 'Rechercher des fandoms...'
      },
      detail: {
        label: 'Fandom',
        members: 'membres',
        online: 'en ligne',
        joinTitle: 'Rejoindre {name}',
        joinSubtitle: 'Connectez‑vous avec {members} fans passionnés et ne manquez rien !',
        memberWelcome: 'Vous êtes membre de ce fandom !',
        trendingHashtags: 'Hashtags populaires',
        hashtagsCount: '{count} hashtags',
        tabs: {
          posts: 'Publications',
          members: 'Membres',
          about: 'À propos'
        },
        createPostPlaceholderAdmin: 'Partagez une annonce ou un post avec le fandom...',
        createPostPlaceholderMember: 'Partagez quelque chose avec le fandom...',
        pinPost: 'Épingler',
        announcement: 'Annonce',
        postAnnouncement: 'Publier l’annonce',
        post: 'Publier',
        adminPanel: 'Panneau admin',
        editFandom: 'Modifier le fandom',
        manageMembers: 'Gérer les membres',
        editRules: 'Modifier les règles',
        editHashtags: 'Modifier les hashtags',
        addNewMember: 'Ajouter un membre',
        addMember: 'Ajouter un membre',
        member: 'Membre',
        mod: 'Modérateur',
        saveChanges: 'Enregistrer',
        saveRules: 'Enregistrer les règles',
        cancel: 'Annuler'
      }
    },
    account: {
      editProfile: 'Modifier le profil',
      posts: 'Publications',
      followers: 'Abonnés',
      following: 'Abonnements',
      myFandoms: 'Mes fandoms',
      saved: 'Enregistrés',
      empty: {
        noPostsYet: 'Pas encore de publications',
        sharePrompt: 'Partagez vos idées avec le monde !',
        userHasNoPosts: "{name} n’a encore rien partagé.",
        noFollowers: 'Aucun abonné',
        followersHint: 'Quand des personnes vous suivent, elles apparaissent ici.',
        notFollowingAnyone: 'Vous ne suivez personne',
        findPeople: 'Trouvez des personnes à suivre.',
        noSavedPosts: 'Aucune publication enregistrée',
        savedHint: 'Les publications enregistrées apparaîtront ici.',
        noFandomsJoined: 'Aucun fandom rejoint',
        joinAFandomHint: 'Rejoignez un fandom pour le voir ici.'
      },
      notFound: {
        title: 'Utilisateur introuvable',
        description: 'Le profil recherché n’existe pas.',
        goToDashboard: 'Aller au tableau de bord'
      }
    },
    store: {
      mart: {
        hotDrops: 'Drops en vedette',
        hotDropsSubtitle: 'Offres exclusives limitées dans le temps',
        dontMissOut: 'À ne pas manquer !',
        endsIn: 'Se termine dans',
        stockLevel: 'Niveau de stock',
        claimThisDrop: 'Profiter du drop',
        viewDrop: 'Voir le drop',
        noProductsTitle: 'Aucun produit trouvé',
        noProductsDesc: 'Essayez d’ajuster vos filtres pour voir plus de produits',
        results: 'Résultats'
      },
      productSearch: {
        productsFound: '{count} produits trouvés',
        sortBy: 'Trier par :',
        loadingProducts: 'Chargement des produits...',
        noProductsTitle: 'Aucun produit trouvé',
        noProductsDesc: 'Essayez d’ajuster vos critères de recherche ou de retirer des filtres'
      },
      sortOptions: {
        relevance: 'Pertinence',
        priceLow: 'Prix : du moins cher au plus cher',
        priceHigh: 'Prix : du plus cher au moins cher',
        rating: 'Avis clients',
        newest: 'Plus récents'
      }
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: typeof localStorage !== 'undefined' ? (localStorage.getItem('locale') || 'en') : 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
