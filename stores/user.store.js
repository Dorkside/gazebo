import { defineStore } from "pinia";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    calendars: [],
    refreshCalendarsFn: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    async fetchCalendars() {
      if (!this.user) {
        console.error("User not found, cannot fetch calendars.");
        return;
      }

      const userDocRef = doc(useNuxtApp().$firestore, "users", this.user.uid);

      const { data: calendars, refresh } = await useAsyncData(
        "calendars",
        async () => {
          const calendarQuery = query(collection(userDocRef, "calendars"));
          const querySnapshot = await getDocs(calendarQuery);
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }
      );

      this.$patch({ calendars, refreshCalendarsFn: refresh });
    },
    async refreshCalendars() {
      if (this.refreshCalendarsFn) {
        await this.refreshCalendarsFn();
      } else {
        console.error(
          "Refresh function not available, cannot refresh calendars."
        );
      }
    },
    async createCalendar(calendarData) {
      if (!this.user) {
        console.error("User not found, cannot create calendar.");
        return;
      }

      const userDocRef = doc(useNuxtApp().$firestore, "users", this.user.uid);

      try {
        await addDoc(collection(userDocRef, "calendars"), calendarData);
        setTimeout(() => {
          this.refreshCalendars();
        }, 5000);
      } catch (error) {
        console.error("Error creating calendar:", error);
      }
    }
  },
});
