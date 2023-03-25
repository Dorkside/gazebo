<script setup>
import { ref, onMounted, useMouse, useResizeObserver, computed } from '#imports'

const { x, y } = useMouse()

const constrain = 500

const ex1 = ref(null)

const box = ref(null)

onMounted(() => {
  useResizeObserver(document.body, () => {
    box.value = ex1.value.getBoundingClientRect()
  })
})

const calcX = computed(() =>
  box.value ? -(y.value - box.value.y - box.value.height / 2) / constrain : 0
)
const calcY = computed(() =>
  box.value ? (x.value - box.value.x - box.value.width / 2) / constrain : 0
)

const transform = computed(
  () =>
    `perspective(100px) rotateX(${calcX.value}deg) rotateY(${calcY.value}deg)`
)
</script>

<template>
  <aside
    ref="ex1"
    class="overflow-y-scroll h-96 max-h-full"
    :style="{ transform }"
  >
    <event-list
      calendar-ids="0bd46055c48039d805a0d146505ad2892ac67ccf5f14943edb3357cb78b36946@group.calendar.google.com"
    />
  </aside>
</template>
