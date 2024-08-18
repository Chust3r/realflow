'use server'

import { getSession } from '~lib/session'
import { db } from '~db'
import { schema } from '~drizzle/schema'
import { eq } from 'drizzle-orm'

interface Params {
	username: string
}

export const updateAccount = async ({ username }: Params) => {
	const session = await getSession()

	await db
		.update(schema.users)
		.set({
			name: username,
		})
		.where(eq(schema.users.email, session.email!))
}
