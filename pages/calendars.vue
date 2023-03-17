<script setup>
import { useUserStore } from "~/stores/user.store";
const userStore = useUserStore();

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});

const showModal = ref(false);
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-end mb-4">
      <button @click="showModal = !showModal" class="btn btn-primary">
        Create Calendar
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div v-for="calendar in userStore.calendars" :key="calendar.id" class="calendar-card">
        <div class="bg-white rounded-lg shadow-lg">
          <div class="flex flex-col items-center overflow-hidden relative">
            <div class="calendar-icon text-[120px] text-neutral-200 mb-3 absolute -top-2 left-2 -rotate-12">
              <span class="icon-[fa--calendar]"></span>
            </div>
            <div class="text-center p-5 relative">
              <h3 class="text-lg font-semibold text-gray-900">{{ calendar.name }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ calendar.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreateCalendarModal :show="showModal" @cancel="showModal = false" />
  </div>
</template>
