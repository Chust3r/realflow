import { useStore } from '@nanostores/react'
import { map } from 'nanostores'

export type Event = {
	timestamp: string
	event: string
	payload: string | Record<string, any>
}
interface EventStore {
	events: Event[]
	selectedEvent?: Record<string, any>
}

const eventStore = map<EventStore>({
	events: [],
})

export const setPushEvent = (newEvent: Event) => {
	console.log(newEvent)

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
