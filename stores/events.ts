import { useStore } from '@nanostores/react'
import { map } from 'nanostores'

export type Event = {
	date: string
	event: string
	payload: string
}
interface EventStore {
	events: Event[]
	selectedEvent?: Record<string, any>
}

const eventStore = map<EventStore>({
	events: [],
})

export const setPushEvent = (newEvent: Event) => {
	eventStore.set({
		events: [...eventStore.get().events, newEvent],
	})
}

export const setEventStore = (newState: Partial<EventStore>) => {
	eventStore.set({
		...eventStore.get(),
		...newState,
	})
}

export const resetEventStore = () => {
	eventStore.setKey('events', [])
	eventStore.setKey('selectedEvent', undefined)
}

export const useEventStore = () => useStore(eventStore)
