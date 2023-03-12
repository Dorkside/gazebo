export default defineNuxtRouteMiddleware((to, from) => {
  const userData = useState('userData')
  if (!userData) {
    return navigateTo('/login')
  }
})