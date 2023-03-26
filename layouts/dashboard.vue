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
    <ClientOnly>
      <Teleport to="#nav-menu">
        <a
          class="btn btn-ghost ml-4 transition-colors ease-in-out duration-500 font-bold"
          @click.prevent="$signOut"
        >
          <span v-if="userStore.user">
            {{ userStore.user.email }}
          </span>
        </a>
      </Teleport>
    </ClientOnly>
    <section class="flex flex-1 flex-col stretch justify-items-start items-stretch min-h-screen max-h-screen overflow-hidden">
      <header class="bg-base-300 h-36 relative flex-none">
        <div class="absolute bottom-4 left-4 flex flex-row items-end gap-2">
          <NuxtLink
            to="/calendars"
            class="text-2xl font-bold font-serif m-0 capitalize"
          >
            Dashboard
          </NuxtLink>
          <div id="header" />
        </div>
        <div class="absolute bottom-4 right-4 flex flex-row items-end gap-2">
          <div id="actions" />
        </div>
      </header>
      <article ref="container" class="relative flex flex-1 overflow-hidden">
        <slot />
      </article>
    </section>
    <nav-bar class="fixed top-0 left-0 right-0" />
  </main>
</template>
