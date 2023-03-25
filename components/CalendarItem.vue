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
    $formkit: 'repeater',
    name: 'calendarIds',
    type: 'text',
    label: 'Calendar Ids',
    placeholder: 'Calendar Ids',
    children: [
      {
        $formkit: 'text'
      }
    ]
  }
]

const calendarIds = computed(() => {
  return props.modelValue.calendarIds?.join(',') || ''
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg flex-1">
    <div class="flex flex-col items-center overflow-hidden relative min-h-full">
      <div
        class="calendar-icon text-[120px] text-neutral-200 mb-3 absolute -bottom-24 -left-2 -rotate-12"
      >
        <span class="icon-[fa--calendar]" />
      </div>
      <div class="text-center p-5 relative">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ modelValue.name }}
        </h3>
        <p class="text-sm text-gray-500 mt-1">
          {{ modelValue.description }}
        </p>
      </div>
      <div v-if="editable">
        <div class="flex justify-center items-start">
          <div class="flex-1">
            <FormKit
              :value="modelValue"
              type="form"
              @submit="emit('update:modelValue',$event)"
            >
              <FormKitSchema :schema="schema" />
            </FormKit>
          </div>

          <!-- <event-list
            class="flex-1"
            :calendar-ids="calendarIds"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>
