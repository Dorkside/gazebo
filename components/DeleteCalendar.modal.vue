<script setup>
import { useUserStore } from '~/stores/user.store'

const userStore = useUserStore()

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  calendar: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['cancel'])

const deleteCalendar = async () => {
  await userStore.deleteCalendar(props.calendar.id)
  emit('cancel')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="bg-white w-full max-w-md p-4 mx-2 rounded shadow-md">
      <h3 class="text-xl font-semibold mb-2">
        Delete calendar
      </h3>
      <div class="space-y-2">
        <p>
          Are you sure you want to delete the calendar <strong>{{ calendar.name }}</strong>?
        </p>
        <div class="flex justify-end space-x-2">
          <button class="btn btn-outline" @click="emit('cancel')">
            Cancel
          </button>
          <button class="btn btn-danger" @click="deleteCalendar">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
