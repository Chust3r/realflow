'use server'

import { getSession } from '~lib/session'
import { db } from '~db'
import { schema } from '~drizzle/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { ServerActionResponse } from '~types'

interface Params {
	username: string
}

export const updateAccount = async ({
	username,
}: Params): Promise<ServerActionResponse> => {
	const session = await getSession()

	try {
		await db
			.update(schema.users)
			.set({
				name: username,
			})
			.where(eq(schema.users.email, session.email!))

		revalidatePath('/account')

		return {
			ok: true,
			title: 'Account updated',
			message: 'Your account has been updated',
		}
	} catch (e) {
		return {
			ok: false,
			title: 'Account update failed',
			message: 'Something went wrong while updating your account',
		}
	}
}
