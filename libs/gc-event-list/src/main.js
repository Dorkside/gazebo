import { createApp } from 'vue'
import { defineCustomElement } from 'vue'
import App from './App.vue'
import EventList from './EventList.ce.vue'
import EventItem from './EventItem.ce.vue'
import EventDateFrame from './EventDateFrame.ce.vue'
import EventOccurrences from './EventOccurrences.ce.vue'

const EventListElement = defineCustomElement(EventList)
const EventItemElement = defineCustomElement(EventItem)
const EventDateFrameElement = defineCustomElement(EventDateFrame)
const EventOccurrencesElement = defineCustomElement(EventOccurrences)

customElements.define('event-list', EventListElement)
customElements.define('event-item', EventItemElement)
customElements.define('event-date-frame', EventDateFrameElement)
customElements.define('event-occurrences', EventOccurrencesElement)

createApp(App).mount('#app')