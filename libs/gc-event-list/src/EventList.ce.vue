<script setup>
import { onMounted, ref, computed, provide, toRef, watch } from 'vue';

const props = defineProps({
  userId: {
    type: String,
    required: false,
  },
  gazeboId: {
    type: String,
    required: false,
  },
  configString: {
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

const loading = ref(true);

const fetchGazebo = async () => {
  const response = await fetch(`${import.meta.env.VITE_FUNCTIONS_URL}/getGazebo/?userId=${props.userId}&gazeboId=${props.gazeboId}`).then(res => res.json());
  loading.value = false;
  if (!response.error) {
    data.value = response;
  }
};

const configStringRef = toRef(props, 'configString');
const configs = ref({})

watch(configStringRef, () => {
  configs.value = configStringRef.value && JSON.parse(configStringRef.value);
}, { immediate: true });

provide('configs', configs);
</script>

<template>
  <section class="event-list" v-if="gazeboId">
    <template v-if="events.length">
      <event-item  v-for="event of events" :key="event.id" :event="event" />
    </template>
    <div>
      <p v-if="loading">Loading</p>
      <p v-else-if="!events.length">No events found</p>
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