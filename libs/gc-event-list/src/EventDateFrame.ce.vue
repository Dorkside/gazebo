<script setup>
import { computed } from 'vue';

const props = defineProps(['start','end','hasOccurences'])

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
</script>

<template>
  <div class="date-frame">
    <template v-if="!hasOccurences">
      <h5>
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
  background: #f5f5f5;
  text-transform: uppercase;
  width: 100px;
  padding: 8px;
}
.date-frame .date {
  font-size: 2rem;
}
.date-frame .end-date {
  color: #999;
}
</style>
