import type { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

//→ ADD PROVIDERS

export default {
	providers: [GoogleProvider,GithubProvider],
	session: {
		strategy: 'jwt',
	},
} satisfies NextAuthConfig
