import { defineNuxtPlugin } from '#imports'

function ApiPlugin ({ store }) {
  store.$subscribe((mutation) => {
    const {
      storeId,
      events: { newValue }
    } = mutation
    switch (storeId) {
      case 'user':
        if (newValue) {
          store.fetchCalendars()
        }
        break
      default:
        // eslint-disable-next-line no-console
        console.info(mutation)
    }
  })
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(ApiPlugin)
})
