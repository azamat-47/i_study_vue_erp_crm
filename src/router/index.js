// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'
import LoginView from '@/pages/auth/LoginView.vue'
import StudentView from '@/pages/main/StudentView.vue'
import CoursesView from '@/pages/main/CoursesView.vue'
import TeacherView from '@/pages/main/TeacherView.vue'
import PaymentView from '@/pages/main/PaymentView.vue'



const routes = [
  { path: '/', name: 'courses', component: CoursesView, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginView, meta: { guestOnly: true } },
  { path: '/students', name: 'students', component: StudentView, meta: { requiresAuth: true } },
  { path: '/teachers', name: 'teachers', component: TeacherView, meta: { requiresAuth: true } },
  { path: '/payments', name: 'payments', component: PaymentView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global guard
router.beforeEach((to, from, next) => {
  const auth = useAuth()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})


export default router