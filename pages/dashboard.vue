<script setup>
import { definePageMeta } from '#imports'
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})

const stats = [
  { title: 'Total Loads', value: 1200 },
  { title: 'Active Users', value: 150 },
  { title: 'New Users', value: 30 },
  { title: 'Returning Users', value: 80 }
]
</script>

<template>
  <div class="w-full p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        Usage Stats
      </h2>
      <div class="bg-gray-200 rounded-lg h-6">
        <div
          class="bg-primary-500 text-white text-xs leading-none py-1 text-center rounded-lg"
          :style="`width: 10%;`"
        >
          10%
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(stat, index) in stats" :key="index" class="stat-card">
        <div class="p-5 bg-white rounded-lg shadow-lg">
          <div class="text-center">
            <h4 class="text-lg font-semibold text-gray-900">
              {{ stat.title }}
            </h4>
            <p class="text-2xl text-primary-500 mt-3">
              {{ stat.value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
