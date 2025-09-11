import { defineStore } from 'pinia'

// Temporary store to hold registration data across the multi-step flow
export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    // Support either username or first/last naming schemes
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    profile_image: null, // File
  gender: '',
  birth_date: '',
    categories: []
  }),
  actions: {
  setBasicInfo({ first_name, last_name, email, password, profile_image, gender, birth_date }) {
      this.first_name = first_name || ''
      this.last_name = last_name || ''
      this.email = email
      this.password = password
      this.profile_image = profile_image || null
      this.gender = gender || ''
      this.birth_date = birth_date || ''
    },
    setCategories(categories) {
      this.categories = categories
    },
    toFormData() {
      const fd = new FormData()
      if (this.first_name) fd.append('first_name', this.first_name)
      if (this.last_name) fd.append('last_name', this.last_name)
      fd.append('email', this.email)
      fd.append('password', this.password)
      if (this.profile_image) fd.append('profile_image', this.profile_image)
      // Optional fields if backend accepts them
      if (this.gender) fd.append('gender', this.gender)
  // Backend expects date_naissance
  if (this.birth_date) fd.append('date_naissance', this.birth_date)
      this.categories.forEach(c => fd.append('categories[]', c))
      return fd
    },
    clear() {
      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.password = ''
      this.profile_image = null
      this.gender = ''
  this.birth_date = ''
      this.categories = []
    }
  }
})
