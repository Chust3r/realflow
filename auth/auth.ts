import NextAuth from 'next-auth'
import config from './auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '~prisma'

export const { auth, handlers, signIn, signOut } = NextAuth({
	...config,
	adapter: PrismaAdapter(prisma),
})
