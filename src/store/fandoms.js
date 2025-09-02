import { defineStore } from 'pinia'
import FandomsService from '@/services/fandomsService'
import { normalizeAsset } from '@/utils/assets'

export const useFandomsStore = defineStore('fandoms', {
  state: () => ({
    // Unified fandoms/communities array
    allFandoms: [
      {
        id: 1,
        name: 'Premier League Fans',
        handle: 'premier-league-fans',
        description: 'The ultimate community for Premier League football fans',
        membersCount: '234K',
        logo: 'https://logo.clearbit.com/premierleague.com',
        coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=300&fit=crop',
        category: 'Sports',
        tags: ['PremierLeague', 'Football', 'Soccer', 'EPL', 'MatchDay', 'Transfer'],
        role: 'admin',
        createdAt: '2023-01-15',
        joinedAt: null
      },
      {
        id: 2,
        name: 'Anime & Manga',
        handle: 'anime-manga',
        description: 'All things anime and manga - discussions, fan art, and more',
        membersCount: '980K',
        logo: 'https://logo.clearbit.com/crunchyroll.com',
        coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=300&fit=crop',
        category: 'Entertainment',
        tags: ['Anime', 'Manga', 'Otaku', 'AnimeReview', 'AnimeFan', 'Shounen'],
        role: 'admin',
        createdAt: '2022-08-20',
        joinedAt: null
      }, 
      {
        id: 3,
        name: 'NBA Central',
        handle: 'nba-central',
        description: 'All things NBA. Game threads, highlights, player discussions and basketball strategies.',
        membersCount: '189K',
        logo: 'https://logo.clearbit.com/nba.com',
        coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=300&fit=crop',
        category: 'Sports',
        tags: ['NBA', 'Basketball', 'GameThreads', 'Highlights', 'Players'],
        role: null,
        createdAt: null,
        joinedAt: null
      },
      {
        id: 4,
        name: 'Marvel Multiverse',
        handle: 'marvel-multiverse',
        description: 'Marvel movies, comics, theories and everything MCU',
        membersCount: '1.2M',
        logo: 'https://logo.clearbit.com/marvel.com',
        coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=300&fit=crop',
        category: 'Entertainment',
        tags: ['MCU', 'MarvelComics', 'Avengers', 'SpiderMan', 'XMen', 'MarvelTheory'],
        role: 'member',
        createdAt: null,
        joinedAt: '2023-05-12'
      },
      {
        id: 5,
        name: 'K-Pop Central',
        handle: 'kpop-central',
        description: 'Latest K-Pop news, comebacks, and fan discussions',
        membersCount: '890K',
        logo: 'https://logo.clearbit.com/soompi.com',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop',
        category: 'Music',
        tags: ['KPop', 'BTS', 'BLACKPINK', 'NewJeans', 'Comeback', 'KPopNews'],
        role: 'member',
        createdAt: null,
        joinedAt: '2023-07-08'
      },
      {
        id: 6,
        name: 'Formula 1',
        handle: 'formula-1',
        description: 'The fastest community on FanRadar! Race discussions, team updates, and technical analyses.',
        membersCount: '156K',
        logo: 'https://logo.clearbit.com/formula1.com',
        coverImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=300&fit=crop',
        category: 'Sports',
        tags: ['F1', 'Racing', 'Teams', 'Analysis'],
        role: null,
        createdAt: null,
        joinedAt: null
      },
      {
        id: 7,
        name: 'Tennis World',
        handle: 'tennis-world',
        description: 'Grand Slams, ATP & WTA tours, and everything tennis related. From amateurs to professionals!',
        membersCount: '98K',
        logo: 'https://logo.clearbit.com/atptour.com',
        coverImage: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=300&fit=crop',
        category: 'Sports',
        tags: ['Tennis', 'GrandSlam', 'ATP', 'WTA'],
        role: null,
        createdAt: null,
        joinedAt: null
      },
      {
        id: 8,
        name: 'Cricket Fans',
        handle: 'cricket-fans',
        description: 'Test matches, ODIs, T20s - all cricket formats discussed by passionate fans worldwide.',
        membersCount: '145K',
        logo: 'https://logo.clearbit.com/icc-cricket.com',
        coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=300&fit=crop',
        category: 'Sports',
        tags: ['Cricket', 'Test', 'ODI', 'T20'],
        role: null,
        createdAt: null,
        joinedAt: null
      },
      {
        id: 9,
        name: 'Olympic Games',
        handle: 'olympic-games',
        description: 'All things Olympics. Sports, athletes, and global competitions.',
        membersCount: '200K',
        logo: '',
        coverImage: '',
        category: 'Sports',
        tags: ['Olympics', 'Athletes', 'Competitions'],
        role: null,
        createdAt: null,
        joinedAt: null
      }
      // Add more fandoms as needed
    ],
    userRoles: {
      'premier-league-fans': 'admin',
      'anime-manga': 'admin', 
      'tech-innovators': 'admin',
      'marvel-multiverse': 'member',
      'kpop-central': 'member',
      'anime': 'member',
      'digital-art': 'member'
    },
    userJoinRequests: [], // Pending join requests
    userNotifications: [], // Fandom-related notifications
    userActivity: [], // User activity history in fandoms
    bookmarkedFandoms: [], // User's bookmarked/favorite fandoms
    recentlyVisited: [], // Recently visited fandoms
    
    // Fandom posts data
    fandomPosts: {
      'premier-league-fans': [
        {
          id: 1,
          username: 'FootballFanatic',
          userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          date: '2h ago',
          communityName: '',
          content: 'What a match yesterday! The tactical setup was absolutely brilliant. The way they pressed high and created chances was textbook football.',
          image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop',
          tags: ['match', 'tactics', 'analysis'],
          likes: 89,
          comments: 23,
          // shares removed
          isLiked: false,
          fandom: ''
        },
        {
          id: 2,
          username: 'TacticalGenius',
          userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          date: '5h ago',
          communityName: '',
          content: 'Breaking down the formation changes in the second half. The manager\'s substitutions completely changed the game dynamic.',
          tags: ['tactics', 'formation', 'substitutions'],
          likes: 156,
          comments: 34,
          // shares removed
          isLiked: true,
          fandom: ''
        }
      ]
    },
    
    // Fandom members data
    fandomMembers: {
      'premier-league-fans': [
        {
          id: 1,
          name: 'John Smith',
          username: 'johnsmith',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          role: 'admin',
          posts: 245,
          joinedDate: 'Jan 2019'
        },
        {
          id: 2,
          name: 'Emma Wilson',
          username: 'emmaw',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          role: 'member', // changed from 'moderator' per updated role restrictions
          posts: 189,
          joinedDate: 'Mar 2020'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          username: 'mikej',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
          role: 'member',
          posts: 67,
          joinedDate: 'Aug 2021'
        },
        {
          id: 4,
          name: 'Sarah Davis',
          username: 'sarahd',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
          role: 'member',
          posts: 123,
          joinedDate: 'Feb 2022'
        }
      ]
    },
    // New config to replace constants
    config: {
      // Allowed roles limited to admin and member (moderator removed per requirement)
      memberRoles: {
        ADMIN: 'admin',
        MEMBER: 'member'
      },
      roleOptions: [
        { value: 'member', label: 'Member' },
        { value: 'admin', label: 'Admin' }
      ],
      tabs: [
        { id: 'posts', label: 'Posts' },
        { id: 'members', label: 'Members' },
        { id: 'about', label: 'About' }
      ]
    }
  }),
  
  actions: {
    // Internal helper to keep userRoles map in sync with backend-provided membership role
    syncUserRole(handle, role) {
      if (!handle || !role) return
      // Always trust latest backend role (admin > member)
      this.userRoles[handle] = role
    },
    // Load fandoms from backend API
    async loadFromApi(params = {}) {
      try {
        const res = await FandomsService.list(params)
        const list = res?.data?.fandoms || res?.fandoms || []
        this.allFandoms = list.map(f => ({
          id: f.id,
          name: f.name,
          handle: (f.name || '').toLowerCase().replace(/\s+/g, '-'),
          description: f.description,
          membersCount: f.members_count ?? f.membersCount ?? 0,
          members: f.members_count ?? f.membersCount ?? 0, // alias for components expecting 'members'
          coverImage: normalizeAsset(f.cover_image) || f.cover_image,
          logo: normalizeAsset(f.logo_image) || normalizeAsset(f.cover_image) || f.logo_image || f.cover_image, // prefer dedicated logo
          category: f.subcategory?.name || f.category || '',
          role: f.member_role || (f.is_member ? 'member' : null),
          createdAt: f.created_at || f.createdAt,
          joinedAt: f.joined_at || null,
          postsCount: f.posts_count || 0
        }))
        // Sync roles mapping
        this.allFandoms.forEach(f => { if (f.role) this.syncUserRole(f.handle, f.role) })
      } catch (e) {
        // keep existing mock data on failure
      }
    },
    async fetchFandom(id) {
      try {
        const res = await FandomsService.get(id)
        const f = res?.data?.fandom || res?.fandom
        if (f) {
          const existingIdx = this.allFandoms.findIndex(x => x.id === f.id)
          const record = {
            id: f.id,
            name: f.name,
            handle: (f.name || '').toLowerCase().replace(/\s+/g, '-'),
            description: f.description,
            membersCount: f.members_count ?? 0,
            coverImage: normalizeAsset(f.cover_image) || f.cover_image,
            logo: normalizeAsset(f.logo_image) || normalizeAsset(f.cover_image) || f.logo_image || f.cover_image,
            category: f.subcategory?.name || '',
            role: f.member_role || (f.is_member ? 'member' : null),
            createdAt: f.created_at,
            joinedAt: f.is_member ? new Date().toISOString().slice(0,10) : null,
            postsCount: f.posts_count || 0
          }
          if (existingIdx !== -1) this.allFandoms[existingIdx] = { ...this.allFandoms[existingIdx], ...record }
          else this.allFandoms.push(record)
          if (record.role) this.syncUserRole(record.handle, record.role)
          return record
        }
      } catch (e) { /* ignore */ }
      return null
    },
    async loadMyFandoms(params = {}) {
      try {
        const res = await FandomsService.myFandoms(params)
        const list = res?.data?.fandoms || res?.fandoms || []
        // Merge or update existing allFandoms entries with role & joined info
        list.forEach(item => {
          const f = item.fandom || item
          if (!f) return
          const idx = this.allFandoms.findIndex(x => x.id === f.id)
          const record = {
            id: f.id,
            name: f.name,
            handle: (f.name || '').toLowerCase().replace(/\s+/g, '-'),
            description: f.description,
            membersCount: f.members_count ?? f.membersCount ?? 0,
            members: f.members_count ?? f.membersCount ?? 0,
            coverImage: normalizeAsset(f.cover_image) || f.cover_image,
            logo: normalizeAsset(f.logo_image) || normalizeAsset(f.cover_image) || f.logo_image || f.cover_image,
            category: f.subcategory?.name || f.category || '',
            role: item.role || f.member_role || (f.is_member ? 'member' : null),
            createdAt: f.created_at || f.createdAt,
            joinedAt: item.joined_at || f.joined_at || null,
            postsCount: f.posts_count || f.postsCount || 0
          }
          if (idx !== -1) {
            this.allFandoms[idx] = { ...this.allFandoms[idx], ...record }
          } else {
            this.allFandoms.push(record)
          }
          if (record.role) this.syncUserRole(record.handle, record.role)
        })
        return list
      } catch (e) { return [] }
    },
  async fetchFandomPosts(id, params = {}) {
      try {
    const res = await FandomsService.getPosts(id, params)
        const posts = res?.data?.posts || res?.posts || []
    const handle = this.allFandoms.find(f => f.id === id)?.handle
        if (!handle) return []
        this.fandomPosts[handle] = posts.map(p => ({
          id: p.id,
          username: p.author?.username || p.user?.username || 'user',
          userAvatar: normalizeAsset(p.author?.avatar || p.user?.profile_image) || '/images/me.png',
          date: p.created_at || p.createdAt,
          content: p.content || p.description,
          image: Array.isArray(p.media) ? normalizeAsset(p.media[0]) : normalizeAsset(p.media),
          tags: p.tags || [],
          likes: p.likes || 0,
          comments: p.comments || 0,
          isLiked: !!p.is_liked,
          fandom: handle
        }))
        return this.fandomPosts[handle]
      } catch (e) { return [] }
    },
  async fetchFandomMembers(id, params = {}) {
      try {
    const res = await FandomsService.getMembers(id, params)
        const members = res?.data?.members || res?.members || []
    const handle = this.allFandoms.find(f => f.id === id)?.handle
        if (!handle) return []
        this.fandomMembers[handle] = members.map(m => ({
          id: m.user?.id || m.member_id,
          name: (m.user?.first_name && m.user?.last_name) ? `${m.user.first_name} ${m.user.last_name}` : (m.user?.username || 'User'),
          username: m.user?.username || m.user?.first_name || 'user',
          avatar: normalizeAsset(m.user?.profile_image) || '/images/me.png',
          role: m.member_role || 'member',
          posts: m.posts_count || 0,
          joinedDate: m.joined_at || ''
        }))
        return this.fandomMembers[handle]
      } catch (e) { return [] }
    },
    async createFandomApi(payload) {
      try {
        const form = new FormData()
  // Map expected backend keys explicitly to avoid sending extraneous data
  if (payload.name) form.append('name', payload.name)
  if (payload.description) form.append('description', payload.description)
  if (payload.subcategory_id) form.append('subcategory_id', payload.subcategory_id)
  if (payload.cover_image) form.append('cover_image', payload.cover_image)
  if (payload.logo_image) form.append('logo_image', payload.logo_image)
        const res = await FandomsService.create(form)
        const f = res?.data?.fandom || res?.fandom
        if (f) {
          await this.fetchFandom(f.id)
        }
        return res
      } catch (e) { return null }
    },
  async updateFandomApi(id, payload) {
      try {
        const res = await FandomsService.update(id, payload)
        const f = res?.data?.fandom || res?.fandom
        if (f) await this.fetchFandom(id)
        return res
      } catch (e) { return null }
    },
    // Create new fandom
    createFandom(fandomData) {
      const newFandom = {
        id: Date.now(),
        name: fandomData.title,
        handle: fandomData.handle,
        description: fandomData.tagline,
        fullDescription: fandomData.description,
        membersCount: '1',
        logo: fandomData.avatar || '',
        coverImage: fandomData.coverImage || '',
        category: fandomData.categoryName || '',
        tags: [...fandomData.tags],
        privacy: fandomData.privacy,
        allowMemberInvites: fandomData.allowMemberInvites,
        requireApproval: fandomData.requireApproval,
        role: 'admin',
        createdAt: new Date().toISOString().slice(0, 10),
        joinedAt: null
      }
      
      // Add to allFandoms
      this.allFandoms.unshift(newFandom)
      
      // Set user as admin
      this.userRoles[fandomData.handle] = 'admin'
      
      // Initialize fandom members with creator
      if (!this.fandomMembers[fandomData.handle]) {
        this.fandomMembers[fandomData.handle] = []
      }
      this.fandomMembers[fandomData.handle].push({
        id: Date.now(),
        name: 'You',
        username: 'you',
        avatar: fandomData.avatar || '/images/me.png',
        role: 'admin',
        posts: 0,
        joinedDate: new Date().toLocaleDateString()
      })
      
      // Initialize fandom posts
      if (!this.fandomPosts[fandomData.handle]) {
        this.fandomPosts[fandomData.handle] = []
      }
      
      return newFandom
    },

    // Save fandom draft
    saveFandomDraft(fandomData) {
      // Save to localStorage for persistence
      localStorage.setItem('fandom_draft', JSON.stringify(fandomData))
    },

    // Load fandom draft
    loadFandomDraft() {
      const draft = localStorage.getItem('fandom_draft')
      return draft ? JSON.parse(draft) : null
    },

    // Clear fandom draft
    clearFandomDraft() {
      localStorage.removeItem('fandom_draft')
    },

    setUserRole(fandomHandle, role) {
      this.userRoles[fandomHandle] = role
    },
    
    addUserFandom(fandom) {
      if (!this.userFandoms.find(f => f.id === fandom.id)) {
        this.userFandoms.push(fandom)
      }
    },
    
    removeUserFandom(fandomId) {
      this.userFandoms = this.userFandoms.filter(f => f.id !== fandomId)
      delete this.userRoles[fandomId]
    },

    // Fandom posts actions
    addFandomPost(fandomHandle, post) {
      if (!this.fandomPosts[fandomHandle]) {
        this.fandomPosts[fandomHandle] = []
      }
      this.fandomPosts[fandomHandle].unshift(post)
    },

    deleteFandomPost(fandomHandle, postId) {
      if (this.fandomPosts[fandomHandle]) {
        this.fandomPosts[fandomHandle] = this.fandomPosts[fandomHandle].filter(p => p.id !== postId)
      }
    },

    likeFandomPost(fandomHandle, postId) {
      if (this.fandomPosts[fandomHandle]) {
        const post = this.fandomPosts[fandomHandle].find(p => p.id === postId)
        if (post) {
          post.isLiked = !post.isLiked
          post.likes += post.isLiked ? 1 : -1
        }
      }
    },

    // Fandom members actions
    addFandomMember(fandomHandle, member) {
      if (!this.fandomMembers[fandomHandle]) {
        this.fandomMembers[fandomHandle] = []
      }
      this.fandomMembers[fandomHandle].push(member)
    },

    removeFandomMember(fandomHandle, memberId) {
      if (this.fandomMembers[fandomHandle]) {
        this.fandomMembers[fandomHandle] = this.fandomMembers[fandomHandle].filter(m => m.id !== memberId)
      }
    },

    changeFandomMemberRole(fandomHandle, memberId, newRole) {
      if (this.fandomMembers[fandomHandle]) {
        const member = this.fandomMembers[fandomHandle].find(m => m.id === memberId)
        if (member) {
          member.role = newRole
        }
      }
    },

    // Call backend to change a member role then update local state
    async updateMemberRoleApi(fandomId, memberId, newRole, fandomHandle) {
      try {
        const res = await FandomsService.changeRole(fandomId, memberId, { role: newRole })
        if (res?.success) {
          // Update local member list
          if (fandomHandle) this.changeFandomMemberRole(fandomHandle, memberId, newRole)
          // If it's the current logged user (id match in members list flagged maybe) we may need to update role mapping
          if (fandomHandle) {
            const rec = this.allFandoms.find(f => f.handle === fandomHandle)
            if (rec && rec.id === memberId) { // unlikely (fandom id vs user id) ignore
              // noop
            }
            // If userRoles contains current handle for authenticated user and memberId matches current user, update mapping externally (auth store not injected here)
          }
        }
        return res
      } catch (e) {
        return { success: false, message: e?.message || 'Role update failed' }
      }
    },

    // Leave fandom via API then update local state
    async leaveFandomApi(id, handle, userId) {
      try {
        const res = await FandomsService.leave(id)
        if (res?.success) {
          // Clear role mapping
          if (handle) delete this.userRoles[handle]
          // Update allFandoms record
          if (handle) {
            const rec = this.allFandoms.find(f => f.handle === handle)
            if (rec) {
              rec.role = null
              if (rec.membersCount && /^\d+$/.test(String(rec.membersCount))) {
                rec.membersCount = String(Math.max(0, parseInt(rec.membersCount,10)-1))
              }
            }
          }
          // Remove from members list
          if (handle && this.fandomMembers[handle]) {
            this.fandomMembers[handle] = this.fandomMembers[handle].filter(m => m.id !== userId)
          }
        }
        return res
      } catch (e) {
        return { success: false, message: e?.message || 'Leave failed' }
      }
    },

    // Join fandom via API then update local state
    async joinFandom(id) {
      try {
        const res = await FandomsService.join(id)
        if (res && res.success) {
          const fandom = this.allFandoms.find(f => f.id === id)
          if (fandom) {
            fandom.role = 'member'
            if (!fandom.joinedAt) fandom.joinedAt = new Date().toISOString().slice(0, 10)
            if (typeof fandom.membersCount === 'string' && /^\d+$/.test(fandom.membersCount)) {
              fandom.membersCount = (parseInt(fandom.membersCount, 10) + 1).toString()
            }
            else if (typeof fandom.membersCount === 'number') {
              fandom.membersCount += 1
            }
            // keep alias (members) in sync
            if (fandom.members != null) {
              if (typeof fandom.members === 'string' && /^\d+$/.test(fandom.members)) {
                fandom.members = (parseInt(fandom.members, 10) + 1).toString()
              } else if (typeof fandom.members === 'number') {
                fandom.members += 1
              }
            } else {
              fandom.members = fandom.membersCount
            }
            this.userRoles[fandom.handle] = 'member'
          }
        }
        return res
      } catch (e) {
        // swallow errors for now; could add notification later
        return null
      }
    }
  },
  
  getters: {
    isAdmin: (state) => (fandomHandle) => {
      if (!fandomHandle) return false
  const mapRole = state.userRoles[fandomHandle]
  if (mapRole) return mapRole === 'admin'
  const rec = state.allFandoms.find(f => f.handle === fandomHandle)
  return rec?.role === 'admin'
    },
    isMember: (state) => (fandomHandle) => {
      if (!fandomHandle) return false
  if (state.userRoles[fandomHandle]) return true
  const rec = state.allFandoms.find(f => f.handle === fandomHandle)
  return !!rec?.role
    },
    getUserRole: (state) => (fandomHandle) => {
      if (!fandomHandle) return null
  return state.userRoles[fandomHandle] || state.allFandoms.find(f => f.handle === fandomHandle)?.role || null
    },
    adminFandoms: (state) => state.allFandoms.filter(fandom => fandom.role === 'admin'),
    memberFandoms: (state) => state.allFandoms.filter(fandom => fandom.role === 'member'),
    fandomCount: (state) => state.allFandoms.length,

    // Fandom posts getters
    getFandomPosts: (state) => (fandomHandle) => {
      return state.fandomPosts[fandomHandle] || []
    },

    getFandomPostsCount: (state) => (fandomHandle) => {
      return state.fandomPosts[fandomHandle]?.length || 0
    },

    // Fandom members getters
    getFandomMembers: (state) => (fandomHandle) => {
      return state.fandomMembers[fandomHandle] || []
    },

    getFandomMembersCount: (state) => (fandomHandle) => {
      return state.fandomMembers[fandomHandle]?.length || 0
    },

    searchFandomMembers: (state) => (fandomHandle, query) => {
      const members = state.fandomMembers[fandomHandle] || []
      if (!query) return members
      return members.filter(member => 
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.username.toLowerCase().includes(query.toLowerCase())
      )
    },

    // Get count of communities/fandoms by category
    getCommunitiesCountByCategory: (state) => (category) => {
      if (!category) return 0;
      return state.allFandoms.filter(f => f.category === category).length;
    },

    // Get all communities/fandoms by category
    getCommunitiesByCategory: (state) => (category) => {
      if (!category) return [];
      return state.allFandoms.filter(f => f.category === category);
    },

    // Return fandom detail from store or generate defaults
    getFandomDetail: (state) => (handle) => {
      if (!handle) {
        return {
          name: 'Fandom',
          description: 'Welcome to this fandom',
          fullDescription: 'This is a newly created fandom on FanRadar.',
          coverImage: 'https://source.unsplash.com/1200x675/?community',
          logo: 'https://source.unsplash.com/160x160/?logo',
          members: '0',
          onlineMembers: '0',
          totalPosts: '0',
          createdDate: new Date().getFullYear().toString(),
          rules: [],
          tags: [],
          hashtags: []
        }
      }
      const found = state.allFandoms.find(f => f.handle === handle)
      if (found) {
        return {
          name: found.name,
          description: found.description || '',
          fullDescription: found.fullDescription || (found.description || ''),
          coverImage: found.coverImage || 'https://source.unsplash.com/1200x675/?community',
          logo: found.logo || 'https://source.unsplash.com/160x160/?logo',
          members: found.membersCount || '0',
          onlineMembers: found.onlineMembers || '0',
          totalPosts: found.totalPosts || '0',
          createdDate: found.createdAt || new Date().getFullYear().toString(),
          rules: found.rules || [],
          tags: found.tags || [],
          hashtags: found.hashtags || [] ,
          category: found.category || ''
        }
      }
      const displayName = handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      return {
        name: displayName,
        description: `Welcome to ${displayName}!`,
        fullDescription: `This is the ${displayName} fandom on FanRadar. Create posts, add members and grow the community.`,
        coverImage: 'https://source.unsplash.com/1200x675/?community',
        logo: 'https://source.unsplash.com/160x160/?logo',
        members: '0',
        onlineMembers: '0',
        totalPosts: '0',
        createdDate: new Date().getFullYear().toString(),
        rules: [],
        tags: [],
        hashtags: [],
        category: ''
      }
    }
  }
})
