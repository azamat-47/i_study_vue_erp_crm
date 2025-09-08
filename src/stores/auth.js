import { defineStore } from 'pinia'
import API from '@/api/axios';

export const useAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('vueIstudyToken') || ''
  }), 
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(username, password) {
      const { data } = await API.post('/api/auth/login', { username, password })
      this.token = data.accessToken
      localStorage.setItem('vueIstudyToken', this.token)
    },
    async logout() {
      this.token = ''
      localStorage.removeItem('vueIstudyToken');
      const router = (await import('@/router')).default
      router.push('login');
    }
  }
})

