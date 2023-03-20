<script setup>
import { FormKit, FormKitSchema } from '@formkit/vue'

defineProps({
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
  },
  {
    $formkit: 'text',
    name: 'calendarIds',
    type: 'taglist',
    label: 'Calendar IDs',
    placeholder: 'Calendar IDs',
    allowNewValues: true
  }
]
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg">
    <div class="flex flex-col items-center overflow-hidden relative">
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
        <div class="flex justify-center items-center">
          <FormKit
            :value="modelValue"
            type="form"
            @submit="emit('update:modelValue',$event)"
          >
            <FormKitSchema :schema="schema" />
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>
