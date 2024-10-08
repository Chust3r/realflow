import { useStore } from '@nanostores/react'
import { map } from 'nanostores'

interface ISecretStore {
	roomId: string
	open: boolean
	confirm: boolean
	confirmOpen: boolean
}

const secretStore = map<ISecretStore>({
	roomId: '',
	open: false,
	confirm: false,
	confirmOpen: false,
})

//→ SECRET STORE SETTER

export const setSecretStore = (newState: Partial<ISecretStore>) => {
	secretStore.set({
		...secretStore.get(),
		...newState,
	})
}

//→ SECRET STORE HOOK

export const useSecretStore = () => useStore(secretStore)
