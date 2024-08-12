import { useStore } from '@nanostores/react'
import { map } from 'nanostores'

//→ GLOABL STATE FOR CREATE CHANNEL AND CONFIRMATION DIALOG

interface IChannelStore {
	open: boolean
	confirm: boolean
	confirmOpen: boolean
}

const channelStore = map<IChannelStore>({
	open: false,
	confirm: false,
	confirmOpen: false,
})

//→ CHANNEL STORE SETTER

export const setChannelStore = (newState: Partial<IChannelStore>) => {
	channelStore.set({
		...channelStore.get(),
		...newState,
	})
}

//→ CHANNEL STORE HOOK

export const useChannelStore = () => useStore(channelStore)
