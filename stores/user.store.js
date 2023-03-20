import { defineStore } from 'pinia'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query
} from 'firebase/firestore'
import { useNuxtApp, useAsyncData } from '#imports'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    calendars: [],
    refreshCalendarsFn: null,
    offsets: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    containerOffsets: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  }),
  actions: {
    setUser (user) {
      this.user = user
    },
    async fetchCalendars () {
      if (!this.user) {
        throw new Error('User not found, cannot fetch calendars.')
      }

      const userDocRef = doc(useNuxtApp().$firestore, 'users', this.user.uid)

      const { data: calendars, refresh } = await useAsyncData(
        'calendars',
        async () => {
          const calendarQuery = query(collection(userDocRef, 'calendars'))
          const querySnapshot = await getDocs(calendarQuery)
          return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        }
      )

      this.$patch({ calendars, refreshCalendarsFn: refresh })
    },
    async refreshCalendars () {
      if (this.refreshCalendarsFn) {
        await this.refreshCalendarsFn()
      } else {
        throw new Error(
          'Refresh function not available, cannot refresh calendars.'
        )
      }
    },
    async createCalendar (calendarData) {
      if (!this.user) {
        throw new Error('User not found, cannot create calendar.')
      }

      const userDocRef = doc(useNuxtApp().$firestore, 'users', this.user.uid)

      try {
        await addDoc(collection(userDocRef, 'calendars'), calendarData)
        this.refreshCalendars()
      } catch (error) {
        throw new Error('Error creating calendar:', error)
      }
    },
    async updateCalendar (calendarData) {
      if (!this.user) {
        throw new Error('User not found, cannot update calendar.')
      }

      const calendarDocRef = doc(useNuxtApp().$firestore, `users/${this.user.uid}/calendars`, calendarData.id)

      try {
        await updateDoc(calendarDocRef, calendarData)
        this.refreshCalendars()
      } catch (error) {
        throw new Error(error)
      }
    },
    setOffsets (offsets) {
      this.offsets = offsets
    },
    setContainerOffsets (offsets) {
      this.containerOffsets = offsets
    }
  }
})
