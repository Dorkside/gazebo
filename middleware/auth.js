import { useUserStore } from "~/stores/user.store";
const userStore = useUserStore();

export default defineNuxtRouteMiddleware((to, from) => {
  if (!userStore.user) {
    return navigateTo({path: "/login", query: {redirect: to.fullPath}});
  }
});
