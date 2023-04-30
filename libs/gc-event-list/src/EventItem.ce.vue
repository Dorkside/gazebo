<script setup>
import { computed, inject, ref, watch } from 'vue'
import { RRule } from 'rrule'

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

const props = defineProps(['event'])

const start = computed(() => props.event.start.date || props.event.start.dateTime)
const end = computed(() => props.event.end.date || props.event.end.dateTime)

const rules = computed(() => {
  if (props.event.recurrence) {
    return props.event.recurrence.map((r) => {
      return RRule.fromString(`DTSTART:${new Date(start.value).toISOString().replace(/[^a-zA-Z0-9 ]/g, '').replace('000Z','Z')}\n${r}`);
    });
  }
  return null;
});

const occurrences = computed(() => {
  if (rules.value) {
    return rules.value.map((r) => {
      return r.all()
    }).flat().reduce((acc,curr) => {
      const index = `${curr.getYear()}-${dayjs(curr).week()}`
      if (!acc[index]) {
        acc[index] = []
      }
      acc[index].push(curr)
      return acc;
    },{})
  }
  return null;
});

const eventColor = ref('#000055')
const textColor = ref('#ffffff')

watch(() => [inject('configs'), props.event], (val) => {
  if (props.event) {
    const config = val[props.event.organizer.email];
    eventColor.value = config?.eventColor || '#000055';
    textColor.value = config?.textColor || '#ffffff';
  }
}, { immediate: true })
</script>

<template>
  <div class="event">
    <div class="date-container">
      <div class="event-occurrences flex-1" v-if="occurrences">
        <event-occurrences :occurrences="occurrences" />
      </div>
      <event-date-frame :event="event" class="flex-1" :start="start" :end="end" :has-occurences="occurrences"/>
    </div>
    <div class="content-frame">
      <h3 v-if="event.summary" class="title" >

        <a :href="event.htmlLink" target="_blank" class="nolink">
          {{ event.summary }}
        </a>
      </h3>
      <p v-if="event.description">{{ event.description }}</p>
      <p v-if="event.location">
        {{ event.location }}

      {{ config }}
      </p>
    </div>
    <h5 class="type-frame" v-if="event.organizer.displayName">
      {{ event.organizer.displayName }}
    </h5>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@700&display=swap');

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
.date-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.content-frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  color: v-bind(textColor);
  padding: 8px;
}
.content-frame .title {
  font-size: 1.5rem;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.event {
  padding: 4px;
  background: v-bind(eventColor);
  display: flex;
  flex-direction: row;
  position: relative;
}
.event:not(:last-child) {
  margin-bottom: 4px;
}
.type-frame {
  position: absolute;
  top: 8px;
  right: 8px;
  color: white;
  opacity: 0.3;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.event-occurrences {
  display: flex;
  flex-direction: row;
  gap: 4px;
  overflow: auto;
  max-height: 100%;
}

.flex-1 {
  flex: 1 0 auto;
  display: flex;
}

.nolink {
  color: inherit;
  text-decoration: none;
}
.nolink:hover {
  text-decoration: underline;
}
</style>
