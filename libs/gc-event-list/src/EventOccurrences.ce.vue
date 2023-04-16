<script setup>
import { computed, ref } from 'vue'
const props = defineProps(['occurrences'])

const mappedOccurrences = computed(() => {
  return Object.values(props.occurrences).map((occurrence) => {
    return {
      start: occurrence[0],
      end: occurrence[occurrence.length - 1],
    }
  })
})

const displayIndex = ref(0);

const displayedOccurrence = computed(() => {
  return mappedOccurrences.value[displayIndex.value]
})

</script>

<template>
  <div class="occurrences">
    <event-date-frame
      :start="displayedOccurrence.start"
      :end="displayedOccurrence.end"
    />
    <div class="previous-button" v-if="displayIndex > 0" @click="displayIndex--">
      ⏴
    </div>
    <div class="next-button" v-if="displayIndex < mappedOccurrences.length - 1" @click="displayIndex++">
      ⏵
    </div>
  </div>
</template>

<style scoped>
.occurrences {
  display: flex;
  position: relative;
}
.next-button {
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
.previous-button {
  cursor: pointer;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
