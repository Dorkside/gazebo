<script setup>
import { ref, definePageMeta } from '#imports'
import { useUserStore } from '~/stores/user.store'

const userStore = useUserStore()

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
  pageTransition: { name: 'simple' }
})

const showModal = ref(false)

const calendarRefs = ref({})

const mountRef = (el, id) => {
  calendarRefs.value[id] = el
}
</script>

<template>
  <div class="container mx-auto absolute top-0 left-0 right-0 bottom-0">
    <ClientOnly>
      <Teleport to="#actions">
        <button class="btn btn-primary" @click="showModal = !showModal">
          Create Calendar
        </button>
      </Teleport>
    </ClientOnly>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <template
        v-for="calendar in userStore.calendars"
        :key="calendar.id"
      >
        <div
          :ref="el => mountRef(el, calendar.id)"
        >
          <NuxtLink
            :to="`/calendars/${calendar.id}`"
          >
            <calendar-item
              :model-value="calendar"
            />
          </NuxtLink>
        </div>
      </template>
    </div>
    <CreateCalendarModal :show="showModal" @cancel="showModal = false" />
  </div>
</template>

<style scoped>
.select-placeholder {
  position: relative;
  min-height: 300px;
  width: 100%;
}
</style>
