<script setup>
import { computed, definePageMeta, useRoute, ref } from '#imports'
import { useUserStore } from '~/stores/user.store'

const userStore = useUserStore()
const route = useRoute()

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
  pageTransition: {
    name: 'simple'
  }
})

const calendar = computed(() => {
  return userStore.calendars.find(
    calendar => calendar.id === route.params.id
  )
})

const updateCalendar = (calendar) => {
  userStore.updateCalendar(calendar)
}
</script>

<template>
  <div class="flex flex-1">
    <calendar-item
      v-if="calendar"
      :model-value="calendar"
      :editable="true"
      @update:model-value="updateCalendar"
    />
  </div>
</template>
