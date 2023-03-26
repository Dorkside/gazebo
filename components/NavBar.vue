<script setup>

import { useWindowScroll, computed } from '#imports'
const { y } = useWindowScroll()

const hasScrolled = computed(() => y.value > 0)

</script>

<template>
  <nav
    class="transition-colors z-10 ease-in-out duration-500 h-20"
    :class="{ 'bg-transparent': !hasScrolled, 'bg-primary': hasScrolled }"
  >
    <div class="container mx-auto py-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-white font-bold text-lg font-serif">
          <logo-title />
        </NuxtLink>
        <button class="burger block lg:hidden focus:outline-none">
          <svg
            class="h-6 w-6 fill-current text-white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z" />
          </svg>
        </button>
        <div id="nav-menu" class="hidden lg:flex lg:items-center" />
      </div>
    </div>
  </nav>
</template>
