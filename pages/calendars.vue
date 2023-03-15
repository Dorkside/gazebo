<script setup>
import { useUserStore } from "~/stores/user.store";
const userStore = useUserStore();

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

const showModal = ref(false);
const { calendars } = userStore;
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-end mb-4">
      <button @click="showModal = !showModal" class="btn btn-primary">
        Create Calendar
      </button>
    </div>
    <ul class="divide-y divide-gray-200">
      <li v-for="calendar in calendars" :key="calendar.id">
        <div class="flex items-center py-4">
          <div class="ml-3">
            <p class="text-lg font-medium text-gray-900">{{ calendar.name }}</p>
            <p class="text-sm text-gray-500">{{ calendar.description }}</p>
          </div>
        </div>
      </li>
    </ul>
    <CreateCalendarModal :show="showModal" @cancel="showModal = false" />
  </div>
</template>
