<script setup>
import { useUserStore } from "~/stores/user.store";
definePageMeta({
  layout: false,
});

const route = useRoute()

const userStore = useUserStore();

watch(
  () => userStore.user,
  (user) => {
    if (user) {
      console.log(route.query)
      navigateTo(route.query.redirect || "/dashboard");
    }
  }
);
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div
      class="max-w-md w-full mx-auto flex flex-col justify-center items-stretch"
    >
      <h1 class="text-[70px] font-black mb-6 text-center">
        <logo-title />
      </h1>
      <h1 class="text-3xl font-bold mb-6">Log in to your account</h1>
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        @click.prevent="$signIn"
      >
        Log in with Google
      </button>
    </div>
  </div>
</template>
