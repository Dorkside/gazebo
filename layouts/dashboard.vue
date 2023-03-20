<script setup>
import { useUserStore } from '~/stores/user.store'
import { onMounted, ref, useHead } from '#imports'

const userStore = useUserStore()

const container = ref(null)

const head = useHead()

onMounted(() => {
  const containerRect = container.value.getBoundingClientRect()
  userStore.setContainerOffsets({
    x: containerRect.x,
    y: containerRect.y,
    width: containerRect.width,
    height: containerRect.height
  })
})
</script>

<template>
  <main class="flex flex-row">
    <section class="flex flex-1 flex-col stretch justify-items-stretch min-h-screen">
      <header class="bg-base-300 h-36 relative">
        <h1
          class="text-2xl font-bold font-serif absolute bottom-4 left-4 m-0 capitalize"
        >
          Dashboard
        </h1>
      </header>
      <article ref="container" class="relative flex flex-1">
        <slot />
      </article>
    </section>
    <nav-bar class="fixed top-0 left-0 right-0" />
  </main>
</template>
