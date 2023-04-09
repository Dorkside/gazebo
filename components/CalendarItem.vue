<script setup>
import equals from 'fast-deep-equal'

import { computed, ref, toRaw, useRoute } from '#imports'

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

const formValue = ref(structuredClone({ calendarIds: [], ...toRaw(props.modelValue) }))

const newCalendar = ref('')

const calendarIds = computed(() => {
  return formValue.value.calendarIds?.join(',') || ''
})

const changesMade = computed(() => {
  return !equals(props.modelValue, formValue.value)
})

const route = useRoute()

const addCalendar = () => {
  if (newCalendar.value) {
    formValue.value.calendarIds.push(newCalendar.value)
    newCalendar.value = ''
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg flex-1 flex">
    <ClientOnly>
      <Teleport to="#actions">
        <button v-if="route.params.id === modelValue.id" class="btn btn-success" :disabled="!changesMade" @click="emit('update:modelValue', formValue)">
          Save
        </button>
      </Teleport>
    </ClientOnly>
    <div class="flex flex-1 flex-col items-stretch overflow-hidden relative min-h-full max-h-full">
      <div
        class="calendar-icon text-[120px] text-neutral-200 mb-3 absolute -bottom-24 -left-2 -rotate-12 z-0"
      >
        <span class="icon-[fa--calendar]" />
      </div>
      <div v-if="!editable" class="flex-1 flex flex-col justify-center items-center p-8">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl font-medium mb-2">
            {{ modelValue.name }}
          </h1>
          <p class="text-sm text-neutral-500">
            {{ modelValue.description }}
          </p>
        </div>
      </div>
      <div v-if="editable" class="container mx-auto relative flex justify-center items-start max-h-full z-1 overflow-hidden">
        <div class="flex-1 max-h-full overflow-auto p-4">
          <div class="card w-full shadow-lg mb-2">
            <div class="card-body">
              <div class="form-control w-full">
                <label class="label font-serif font-medium">
                  <span class="label-text">Name</span>
                </label>
                <input v-model="formValue.name" type="text" placeholder="Type here" class="input input-bordered w-full">
              </div>
              <div class="form-control w-full">
                <label class="label font-serif font-medium">
                  <span class="label-text">Description</span>
                </label>
                <input v-model="formValue.description" type="text" placeholder="Type here" class="input input-bordered w-full">
              </div>
            </div>
          </div>

          <div class="card w-full shadow-lg mb-2">
            <div class="card-body">
              <span class="label-text font-serif font-medium">Calendar IDs</span>

              <div class="p-2">
                <div v-for="calendarId of formValue.calendarIds" :key="calendarId" class="form-control w-full max-w-full flex flex-row input-group">
                  <span class="overflow-hidden w-full text-ellipsis inline-block leading-8">
                    {{ calendarId }}
                  </span>

                  <button class="btn btn-accent btn-sm" @click.prevent="formValue.calendarIds.splice(formValue.calendarIds.indexOf(calendarId),1)">
                    <i class="text-lg icon-[material-symbols--remove]" />
                  </button>
                </div>
              </div>
              <div class="card-actions">
                <div class="form-control w-full flex flex-row input-group">
                  <input v-model="newCalendar" type="text" placeholder="Add calendar ID" class="input input-bordered w-full">
                  <button
                    class="btn btn-primary"
                    @click.prevent="addCalendar"
                  >
                    <i class="text-lg icon-[material-symbols--add]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 flex flex-col p-4 overflow-hidden max-h-full">
          <div
            class="h-full flex-1 overflow-auto"
          >
            <event-list
              gazebo-id="QPipsXL3bjVtkFlbs9PF"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
