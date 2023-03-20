<script setup>
import { definePageMeta } from '#imports'
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})
</script>

<template>
  <div>Settings</div>
</template>
