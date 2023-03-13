<script setup>
const route = useRoute();
</script>

<template>
  <main class="flex flex-row">
    <tool-bar />
    <section class="flex flex-1 flex-col stretch justify-items-stretch">
      <header class="bg-base-300 h-36 relative">
        <h1 class="text-2xl font-bold font-serif absolute bottom-4 left-4 m-0 capitalize">
          {{ route.name }}
        </h1>
      </header>
      <slot />
    </section>
  </main>
  <nav-bar class="fixed top-0 left-0 right-0" />
</template>