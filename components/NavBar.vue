<script setup>
import { computed } from "vue";
const { y } = useWindowScroll();

const hasScrolled = computed(() => y.value > 0);
</script>

<template>
  <nav class="transition-colors z-10 ease-in-out duration-500" :class="{ 'bg-transparent': !hasScrolled, 'bg-primary': hasScrolled }">
    <div class="container mx-auto py-4">
      <div class="flex justify-between items-center">
        <a href="#" class="text-white font-black text-lg font-serif">Gazebo</a>
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
        <div id="nav-menu" class="hidden lg:flex lg:items-center">
          <a href="#" class="text-white py-2 px-4 hover:text-gray-400">
            Features
          </a>
          <a href="#" class="text-white py-2 px-4 hover:text-gray-400">
            Pricing
          </a>
          <a href="#" class="text-white py-2 px-4 hover:text-gray-400">
            Sign In
          </a>
          <a href="#" class="btn ml-4 transition-colors ease-in-out duration-500" :class="{ 'btn-primary': !hasScrolled, 'btn-outline btn-accent': hasScrolled,  }">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
