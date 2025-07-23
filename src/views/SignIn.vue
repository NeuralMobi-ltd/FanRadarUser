<template>
  <div class="flex items-center justify-center min-h-screen bg-white">
    <div class="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
      <div class="flex flex-col items-center mb-8">
        <img src="/images/FanRadar.png" alt="FanRadar Logo" class="w-16 h-16 mb-2" />
        <span class="text-2xl font-semibold text-blue-600">Fan<span class="text-black">Radar</span></span>
      </div>
      <h2 class="text-xl font-bold text-center mb-6 text-blue-700">Sign in to your account</h2>
      <form>
        <label class="block mb-2 font-medium">Email Address</label>
        <input type="email" class="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email address" />
        <label class="block mb-2 font-medium">Password</label>
        <div class="relative mb-4">
          <input type="password" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
          <button type="button" class="absolute right-3 top-2 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </button>
        </div> 
        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center text-sm">
            <input type="checkbox" class="mr-2" />
            <span>
              I've read and agreed to <a href="#" class="text-blue-600 underline">User Agreement</a> and <a href="#" class="text-blue-600 underline">Privacy Policy</a>
            </span>
          </label>
          <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition mb-4">Sign in</button>
      </form>
      <div class="text-center text-gray-500 mb-2">other way to sign in</div>
      <div class="flex justify-center gap-4 mb-4">
        <button class="p-2 rounded-full border hover:bg-gray-100"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-6 h-6" /></button>
        <button class="p-2 rounded-full border hover:bg-gray-100"><img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" class="w-6 h-6" /></button>
      </div>
      <div class="text-center text-sm">
        Don't have an account? <router-link to="/signup" class="text-blue-600 hover:underline">Create Account</router-link>
      </div>
    </div>
  </div>
</template> 