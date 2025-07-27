<template>
  <div class="flex min-h-screen bg-black text-white">
    <!-- Main Feed -->
    <main class="flex-1 flex flex-col items-center px-4 py-8 bg-black">
      <!-- Tabs -->
      <div class="flex gap-8 mb-6 w-full max-w-2xl border-b border-[#232b3e]">
        <button class="pb-3 border-b-2 border-blue-500 font-bold">For you</button>
        <button class="pb-3 text-gray-400 hover:text-white">Following</button>
      </div>
      <!-- Post Composer (optional) -->
      <div class="flex gap-3 mb-6 w-full max-w-2xl">
        <button class="flex flex-col items-center justify-center bg-[#232b3e] hover:bg-[#2d3650] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-font text-lg"></i>
          <span class="text-xs">Text</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#232b3e] hover:bg-[#2d3650] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-camera text-lg"></i>
          <span class="text-xs">Photo</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#232b3e] hover:bg-[#2d3650] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-quote-left text-lg"></i>
          <span class="text-xs">Quote</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#232b3e] hover:bg-[#2d3650] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-link text-lg"></i>
          <span class="text-xs">Link</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#232b3e] hover:bg-[#2d3650] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-comment-dots text-lg"></i>
          <span class="text-xs">Chat</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#232b3e] hover:bg-[#2d3650] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-headphones text-lg"></i>
          <span class="text-xs">Audio</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#232b3e] hover:bg-[#2d3650] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-video text-lg"></i>
          <span class="text-xs">Video</span>
        </button>
      </div>
      <!-- Example Post -->
      <div class="w-full max-w-2xl bg-[#181c23] rounded-xl shadow mb-6">
        <div class="flex items-center px-4 py-3">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-10 h-10 rounded-full mr-3" />
          <div>
            <div class="font-bold text-white">my-heart-of-heart</div>
            <div class="text-xs text-gray-400">Jul 9</div>
          </div>
          <button class="ml-auto text-gray-400 hover:text-white"><i class="fas fa-ellipsis-h"></i></button>
        </div>
        <img src="https://i.imgflip.com/7w4w2v.jpg" class="w-full rounded-b-xl" />
        <div class="flex items-center justify-between px-4 py-2 border-t border-[#232b3e]">
          <div class="flex gap-4">
            <button class="text-gray-400 hover:text-blue-400"><i class="fas fa-comment"></i></button>
            <button class="text-gray-400 hover:text-green-400"><i class="fas fa-retweet"></i></button>
            <button class="text-gray-400 hover:text-red-400"><i class="fas fa-heart"></i></button>
            <button class="text-gray-400 hover:text-yellow-400"><i class="fas fa-bolt"></i></button>
          </div>
          <span class="text-xs text-gray-400">848 notes</span>
        </div>
      </div>
      <!-- ...repeat for more posts... -->
    </main>

    <!-- Right Sidebar -->
    <aside class="w-80 bg-[#11161f] border-l border-[#232b3e] flex flex-col gap-6 py-8 px-4">
      <!-- Search -->
      <div>
        <input
          type="text"
          placeholder="Search FanRadar"
          class="w-full bg-[#232b3e] text-white rounded-full px-4 py-2 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <!-- Ad -->
      <div class="bg-[#232b3e] rounded-xl p-4 text-sm text-gray-300 mb-2">
        <div class="flex items-center gap-2">
          <i class="fas fa-gem text-blue-400"></i>
          <span>Get ad-free and early access to new stuff with Premium.</span>
        </div>
      </div>
      <!-- Check out these blogs -->
      <div>
        <h3 class="font-bold mb-2 text-white">Check out these blogs</h3>
        <div class="space-y-2">
          <div v-for="blog in blogs" :key="blog.username" class="flex items-center justify-between">
            <div>
              <div class="font-semibold text-white">{{ blog.username }}</div>
              <div class="text-xs text-gray-400">{{ blog.desc }}</div>
            </div>
            <div class="flex items-center gap-2">
              <button class="text-blue-400 hover:text-blue-300 text-sm font-medium">Follow</button>
              <button class="text-gray-400 hover:text-red-500 text-lg px-1" title="Remove">&times;</button>
            </div>
          </div>
        </div>
        <a href="#" class="block mt-2 text-blue-400 hover:underline text-sm">Explore all of FanRadar</a>
      </div>
      <!-- Radar -->
      <div class="bg-[#181c23] rounded-xl p-4 mt-4">
        <div class="font-bold mb-2 text-white">Radar</div>
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" class="w-full rounded-lg mb-2" />
        <div class="flex items-center justify-between">
          <div>
            <div class="font-semibold text-white">sentiers-sauvages</div>
            <div class="text-xs text-gray-400">Jul 17</div>
          </div>
          <button class="text-gray-400 hover:text-white"><i class="fas fa-ellipsis-h"></i></button>
        </div>
        <div class="flex items-center gap-4 mt-2 text-gray-400">
          <span><i class="fas fa-bolt"></i> Blaze</span>
          <span>848 notes</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
const blogs = [
  { username: 'oldpaintings', desc: 'Old Paintings' },
  { username: 'bbybluemochi', desc: 'bbybluemochi' },
  { username: 'snapscube', desc: 'final fantasy official blog' },
  { username: 'psykopaths', desc: 'Your Salvation' }
]
</script>

<style scoped>
/* All styling is handled by Tailwind classes */
</style>
