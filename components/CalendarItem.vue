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
    emptyMessage: 'No calendars found'
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
      <div v-if="!editable" class="flex-1 flex flex-col justify-center items-center p-8">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl font-medium mb-2">
            {{ props.modelValue.name }}
          </h1>
          <p class="text-sm text-neutral-500">
            {{ props.modelValue.description }}
          </p>
        </div>
      </div>
      <div v-if="editable" class="container mx-auto relative flex justify-center items-start max-h-full z-1 overflow-hidden">
        <div class="flex-1 max-h-full overflow-auto p-4">
          <FormKit
            :value="modelValue"
            type="form"
            @submit="emit('update:modelValue',$event)"
          >
            <FormKitSchema :schema="schema" />
          </FormKit>
        </div>
        <div class="flex-1 flex flex-col p-4 overflow-hidden max-h-full">
          <div
            v-if="calendarIds"
            class="h-full flex-1 overflow-auto"
          >
            <event-list
              :calendar-ids="calendarIds"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
