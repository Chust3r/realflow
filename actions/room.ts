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
					messagePersistence: values.messagePersistence,
					webhook: values.webhook,
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
			ok: true,
			title: 'Room created',
			message: 'Your room has been created',
		}
	} catch (e) {
		console.log(e)

		return {
			ok: false,
			title: 'Room creation failed',
			message: 'Something went wrong while creating your room',
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
			ok: true,
			title: 'Room updated',
			message: 'Your room has been updated',
		}
	} catch (e) {
		return {
			ok: false,
			title: 'Room update failed',
			message: 'Something went wrong while updating your room',
		}
	}
}

//→ TODO: Delete Room & clean up in WS server (Close all connections & emit event to all clients)

export const deleteRoom = () => {}
