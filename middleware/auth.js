import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useUserStore } from '~/stores/user.store'
const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to) => {
  if (!userStore.user) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
