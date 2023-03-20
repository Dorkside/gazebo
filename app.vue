<script setup>
import { computed } from '#imports'
import { useUserStore } from '~/stores/user.store'

const userStore = useUserStore()

const transform = computed(() => {
  return `translateX(${userStore.offsets.x - userStore.containerOffsets.x}px) translateY(${userStore.offsets.y - userStore.containerOffsets.y}px)`
})

const containerWidth = computed(() => {
  return `${userStore.containerOffsets.width}px`
})

const width = computed(() => {
  return `${userStore.offsets.width}px`
})
const height = computed(() => {
  return `${userStore.offsets.height}px`
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.simple-enter-active,
.simple-leave-active {
  transition: all 0.4s;
}

.simple-enter-from {
  transition-delay: 0.4s;
  opacity: 0;
}
.simple-leave-to {
  opacity: 1;
}

.grow-enter-active,
.grow-leave-active {
  transition: all 0.4s;
  transform-origin: top left;
  transform: translate(0, 0);
  width: v-bind(containerWidth);
}

.grow-enter-from,
.grow-leave-to {
  transform: v-bind(transform);
  width: v-bind(width);
  height: v-bind(height);
}
</style>
