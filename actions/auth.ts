'use server'
import { signIn } from '~auth'

export const google = async () => await signIn('google')

export const github = async () => await signIn('github')
