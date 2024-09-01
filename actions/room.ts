'use server'

import { generateKeys } from '~lib/keys'
import { getSession } from '~lib/session'
import { generateSlug } from '~lib/slug'
import { db } from '~/lib/drizzle'
import { schema } from '~drizzle/schema'
import { revalidatePath } from 'next/cache'
import { ServerActionResponse } from '~types'
import { eq } from 'drizzle-orm'

interface IValues {
	name: string
	description?: string
	authentication: boolean
	messagePersistence: boolean
	webhook: boolean
}

export const createRoom = async (
	values: IValues
): Promise<ServerActionResponse> => {
	const user = await getSession()

	try {
		const { publicKey, secretKey } = generateKeys()

		const slug = generateSlug()

		const room = await db.transaction(async (tx) => {
			const newRoom = await tx
				.insert(schema.rooms)
				.values({
					name: values.name,
					description: values.description || null,
					slug,
					userId: user.id,
					publicKey,
					saveMessages: values.messagePersistence,
					enableAuth: values.authentication,
					enableWebHooks: values.webhook,
				})
				.returning()

			await tx.insert(schema.secretkeys).values({
				roomId: newRoom[0].id,
				value: secretKey,
				description: 'DEFAULT',
			})

			return newRoom
		})

		if (!room) throw new Error('Something went wrong')

		revalidatePath('/dashboard/rooms')

		return {
			status: 'success',
			message: 'Room created successfully',
		}
	} catch (e) {
		console.log(e)

		return {
			status: 'error',
			message: 'Something went wrong',
		}
	}
}

interface Params {
	id: string
	name: string
	description?: string
}

export const updateRoom = async ({
	id,
	name,
	description,
}: Params): Promise<ServerActionResponse> => {
	try {
		await db
			.update(schema.rooms)
			.set({
				name,
				description,
			})
			.where(eq(schema.rooms.id, id))

		revalidatePath('/dashboard/room/:slug/settings')

		return {
			status: 'success',
			message: 'Room updated succesfully',
		}
	} catch (e) {
		return {
			status: 'error',
			message: 'Something went wrong while updating your room',
		}
	}
}
