<script setup>
import { ref } from '#imports'
import { useUserStore } from '~/stores/user.store'

const userStore = useUserStore()

defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['cancel'])

const newCalendar = ref({
  name: '',
  description: ''
})

const saveCalendar = async () => {
  await userStore.createCalendar(newCalendar.value)
  newCalendar.value = {
    name: '',
    description: ''
  }
  emit('cancel')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="bg-white w-full max-w-md p-4 mx-2 rounded shadow-md">
      <h3 class="text-xl font-semibold mb-2">
        New Calendar
      </h3>
      <div class="space-y-2">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="newCalendar.name"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md"
            placeholder="Enter calendar name"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="newCalendar.description"
            class="mt-1 block w-full border-gray-300 rounded-md"
            placeholder="Enter calendar description"
            rows="3"
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button class="btn btn-outline" @click="$emit('cancel')">
            Cancel
          </button>
          <button class="btn btn-primary" @click="saveCalendar">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
