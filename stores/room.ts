import { useStore } from '@nanostores/react'
import { map } from 'nanostores'

//→ GLOABL STATE FOR CREATE Room AND CONFIRMATION DIALOG

interface IRoomStore {
	open: boolean
	confirm: boolean
	confirmOpen: boolean
}

const roomStore = map<IRoomStore>({
	open: false,
	confirm: false,
	confirmOpen: false,
})

//→ Room STORE SETTER

export const setRoomStore = (newState: Partial<IRoomStore>) => {
	roomStore.set({
		...roomStore.get(),
		...newState,
	})
}

//→ Room STORE HOOK

export const useRoomStore = () => useStore(roomStore)
