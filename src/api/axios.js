import axios from 'axios'
import { useAuth } from '@/stores/auth'

const API = axios.create({
  baseURL: 'https://lms-production-94cb.up.railway.app', // backend url
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor: har bir so‘rovga token qo‘shish
API.interceptors.request.use((config) => {
  const auth = useAuth()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Response interceptor: xatolarni umumiy qayta ishlash
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response || error)
    return Promise.reject(error)
  }
)

export default API
