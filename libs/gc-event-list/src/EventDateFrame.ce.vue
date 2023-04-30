<script setup>
import { computed, ref, watch, inject } from 'vue';

const props = defineProps(['start','end','hasOccurences','event'])

const start = computed(() => new Date(props.start))
const end = computed(() => new Date(props.end))

const startTime = computed(() => start.value.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }))
const endTime = computed(() => end.value.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }))

const isSingleDay = computed(() => end.value.getTime() - start.value.getTime() <= 86400000)

const endDate = computed(() => {
  let dateConfig = {
    month: 'short',
    day: 'numeric',
  };
  if (end.value.getMonth() === start.value.getMonth()) {
    dateConfig = {
      day: 'numeric',
    };
  }
  return `${end.value.toLocaleDateString('default', dateConfig)}`;
});

const dateColor = ref('#f5f5f5')
const dateTextColor = ref('#000000')

watch(() => [inject('configs'), props.event], (val) => {
  if (props.event) {
    const config = val[props.event.organizer.email];
    dateColor.value = config?.dateColor || '#f5f5f5';
    dateTextColor.value = config?.dateTextColor || '#000000';
  }
}, { immediate: true })
</script>

<template>
  <div class="date-frame">
    <template v-if="!hasOccurences">
      <h5 class="month">
        {{ start.toLocaleString('default', { month: 'short' }) }}
      </h5>
      <h4 class="date">
        {{ start.getDate() }}
      </h4>
      <h5 class="end-date">
        <span v-if="!isSingleDay">→{{ endDate }}</span>
        <span v-else>&nbsp;</span>
      </h5>
    </template>
    <h5 v-if="startTime !== endTime">
      {{ startTime }}→{{ endTime }}
    </h5>
  </div>
</template>

<style scoped>
h4,h5 {
  line-height: 1.4rem;
}
h3,
h4,
h5 {
  font-family: 'Poppins', sans-serif;
  margin: 0;
}
p {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
}
.date-frame {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: v-bind(dateColor);
  text-transform: uppercase;
  width: 100px;
  padding: 8px;
}
.date-frame .month {
  color: v-bind(dateTextColor);
}
.date-frame .date {
  font-size: 2rem;
  color: v-bind(dateTextColor);
}
.date-frame .end-date {
  color: v-bind(dateTextColor);
  opacity: 0.5;
}
</style>
