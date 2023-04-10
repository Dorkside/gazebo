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
          <h2 class="text-xl mt-8 font-serif">
            General
          </h2>

          <div class="card w-full shadow-lg mb-2 bg-white">
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

          <h2 class="text-xl mt-8 font-serif">
            Calendars
          </h2>

          <div class="form-control w-full flex flex-row input-group input-group-sm my-2">
            <input v-model="newCalendar" type="text" placeholder="Add calendar ID" class="input input-sm input-bordered w-full">
            <button
              class="btn btn-primary btn-sm"
              @click.prevent="addCalendar"
            >
              <i class="text-lg icon-[material-symbols--add]" /> Add
            </button>
          </div>

          <div v-for="calendarId of formValue.calendarIds" :key="calendarId" class="card w-full shadow-lg mb-2 bg-white">
            <div class="card-body">
              <span class="card-title overflow-hidden w-full text-ellipsis inline-block" :title="calendarId">{{ calendarId }}</span>
              <div class="card-actions justify-end">
                <button class="btn btn-accent btn-sm" @click.prevent="formValue.calendarIds.splice(formValue.calendarIds.indexOf(calendarId),1)">
                  <i class="text-lg icon-[material-symbols--remove]" /> Remove
                </button>
              </div>
            </div>
          </div>

          <h2 class="text-xl mt-8 font-serif">
            Danger zone
          </h2>

          <div class="card w-full shadow-lg mb-2 bg-white">
            <div class="card-body">
              <div class="p-2">
                <div class="button-group">
                  <button class="btn btn-error btn-block" @click.prevent="emit('delete')">
                    <i class="text-lg icon-[material-symbols--delete]" />
                    <span>Delete this Gazebo</span>
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
              user-id="MM9i9uWfMOXpZS5a5XFs0Dx58o23"
              :gazebo-id="modelValue.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
