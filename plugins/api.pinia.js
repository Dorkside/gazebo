function ApiPlugin({ store }) {
  store.$subscribe((mutation) => {
    const {
      storeId,
      events: { newValue },
    } = mutation;
    switch (storeId) {
      case "user":
        if (newValue) {
          store.fetchCalendars();
        }
        break;
      default:
        console.log(mutation);
    }
  });
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(ApiPlugin);
});
