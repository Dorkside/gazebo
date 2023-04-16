// This file is used to define the custom elements for the component
import { defineCustomElement } from 'vue'
import EventList from './EventList.ce.vue'
import EventItem from './EventItem.ce.vue'
import EventDateFrame from './EventDateFrame.ce.vue'
import EventOccurrences from './EventOccurrences.ce.vue'

const EventListElement = defineCustomElement(EventList)
const EventItemElement = defineCustomElement(EventItem)
const EventDateFrameElement = defineCustomElement(EventDateFrame)
const EventOccurrencesElement = defineCustomElement(EventOccurrences)

export const register = () => {
  if(customElements.get('event-list') === undefined) {
    customElements.define('event-list', EventListElement)
    customElements.define('event-item', EventItemElement)
    customElements.define('event-date-frame', EventDateFrameElement)
    customElements.define('event-occurrences', EventOccurrencesElement)
  }
}

try {
  window.addEventListener('DOMContentLoaded', () => {
    register()
  }, {once: true})
} catch (e) {
  console.error(e)
}


