<script setup>
import { useRoute, definePageMeta } from '#imports'
definePageMeta({
  layout: false
})

const route = useRoute()
const {user,calendar} = route.params;
</script>

<template>
  <event-list
    :user-id="user"
    :gazebo-id="calendar"
  />
</template>