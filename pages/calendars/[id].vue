<script setup>
import { computed, definePageMeta, useRoute, useRouter, ref, watch } from '#imports'
import { useUserStore } from '~/stores/user.store'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
  pageTransition: {
    name: 'simple'
  }
})

const calendar = computed(() => {
  const cal = userStore.calendars.find(
    calendar => calendar.id === route.params.id
  )
  return cal
})

watch(calendar, (cal) => {
  if (!cal) {
    router.replace('/calendars')
  }
})

const updateCalendar = (calendar) => {
  userStore.updateCalendar(calendar)
}

const showModal = ref(false)
</script>

<template>
  <div class="flex flex-1">
    <ClientOnly>
      <Teleport to="#header">
        <div class="text-xl font-medium">
          /
          {{ calendar?.name }}
        </div>
      </Teleport>
    </ClientOnly>
    <calendar-item
      v-if="calendar"
      :model-value="calendar"
      :editable="true"
      @update:model-value="updateCalendar"
      @delete="showModal = true"
    />
    <DeleteCalendarModal :calendar="calendar" :show="showModal" @cancel="showModal = false" />
  </div>
</template>
