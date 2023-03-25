<script setup>
import { useUserStore } from '~/stores/user.store'
import { onMounted, ref } from '#imports'

const userStore = useUserStore()

const container = ref(null)

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
    <section class="flex flex-1 flex-col stretch justify-items-start items-stretch min-h-screen max-h-screen overflow-hidden">
      <header class="bg-base-300 h-36 relative flex-none">
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
