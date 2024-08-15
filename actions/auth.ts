'use server'

import { signIn, signOut } from '~auth'

export const google = async () => await signIn('google')

export const github = async () => await signIn('github')

export const logOut = async () => {
	await signOut({
		redirectTo: '/',
	})
}
