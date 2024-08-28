import { useStore } from '@nanostores/react'
import { map } from 'nanostores'

export type Event = {
	date: string
	event: string
	payload: string
}
interface EventStore {
	events: Event[]
}

const eventStore = map<EventStore>({
	events: [],
})

export const setPushEvent = (newEvent: Event) => {
	eventStore.set({
		events: [...eventStore.get().events, newEvent],
	})
}

export const resetEventStore = () => {
	eventStore.setKey('events', [])
}

export const useEventStore = () => useStore(eventStore)
