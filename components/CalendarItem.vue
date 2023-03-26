<script setup>
import { FormKit, FormKitSchema } from '@formkit/vue'
import { computed } from '#imports'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const schema = [
  {
    $formkit: 'text',
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Name',
    rules: 'required'
  },
  {
    $formkit: 'text',
    name: 'description',
    type: 'text',
    label: 'Description',
    placeholder: 'Description',
    rules: 'required'
  }, {
    $formkit: 'taglist',
    name: 'calendarIds',
    type: 'text',
    label: 'Calendar Ids',
    placeholder: 'Calendar Ids',
    allowNewValues: true,
    options: [],
    emptyMessage: 'No calendars found',
  }
]

const calendarIds = computed(() => {
  return props.modelValue.calendarIds?.join(',') || ''
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg flex-1 flex">
    <div class="flex flex-1 flex-col items-stretch overflow-hidden relative min-h-full max-h-full">
      <div
        class="calendar-icon text-[120px] text-neutral-200 mb-3 absolute -bottom-24 -left-2 -rotate-12 z-0"
      >
        <span class="icon-[fa--calendar]" />
      </div>
      <div v-if="editable" class="relative flex justify-center items-start max-h-full z-1">
        <div class="flex-1 max-h-full overflow-auto">
          <FormKit
            :value="modelValue"
            type="form"
            @submit="emit('update:modelValue',$event)"
          >
            <FormKitSchema :schema="schema" />
          </FormKit>
        </div>
        <div class="flex-1 max-h-full overflow-auto">
          {{ modelValue }}
          <event-list
            v-if="calendarIds"
            class="flex-1"
            :calendar-ids="calendarIds"
          />
        </div>
      </div>
    </div>
  </div>
</template>
