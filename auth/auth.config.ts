import type { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

//→ ADD PROVIDERS

export default {
	providers: [GoogleProvider],
	session: {
		strategy: 'jwt',
	},
} satisfies NextAuthConfig
