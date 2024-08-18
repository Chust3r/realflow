import NextAuth from 'next-auth'
import config from './auth.config'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '~db'

export const { auth, handlers, signIn, signOut } = NextAuth({
	...config,
	adapter: DrizzleAdapter(db),
})
