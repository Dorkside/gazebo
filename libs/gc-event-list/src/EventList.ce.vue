<script setup>
import { onMounted, ref, computed } from 'vue';

const props = defineProps({
  userId: {
    type: String,
    required: false,
  },
  gazeboId: {
    type: String,
    required: false,
  },
});

const data = ref({});

onMounted(async () => {
  await fetchGazebo();
});

const calendars = computed(() => Object.values(data.value));  
const events = computed(() => calendars.value.map(calendar => calendar.items).flat().sort((a, b) => new Date(a.start.date) - new Date(b.start.date)));

const fetchGazebo = async () => {
  const response = await fetch(`${import.meta.env.VITE_FUNCTIONS_URL}/getGazebo/?userId=${props.userId}&gazeboId=${props.gazeboId}`).then(res => res.json());
  if (!response.error) {
    data.value = response;
  }
};
</script>

<template>
  <section class="event-list" v-if="gazeboId">
    <template v-if="events.length">
      <event-item  v-for="event of events" :key="event.id" :event="event" />
    </template>
    <div>
      <p v-if="!events.length">No events found</p>
    </div>
  </section>
  <p v-else>
    No Gazebo ID provided
  </p>
</template>

<style scoped>
.event-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>