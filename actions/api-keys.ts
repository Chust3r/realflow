'use server'

import { generateKeys } from '~lib/keys'
import { getSession } from '~lib/session'
import { db } from '~/lib/drizzle'
import { schema } from '~drizzle/schema'
import { revalidatePath } from 'next/cache'
import { ServerActionResponse } from '~types'
import { and, eq } from 'drizzle-orm'

interface IValues {
	roomId: string
	description: string
	adresses: string[]
	expires?: string
}

export const switchEnableAuth = async (
	roomId: string,
	enableAuth: boolean
): Promise<ServerActionResponse> => {
	const session = await getSession()

	try {
		await db
			.update(schema.rooms)
			.set({
				enableAuth,
			})
			.where(
				and(
					eq(schema.rooms.id, roomId),
					eq(schema.rooms.userId, session.id)
				)
			)
		revalidatePath('/dashboard/room/[slug]/keys', 'page')

		return {
			ok: true,
			title: 'Success',
			message: `Successfully ${enableAuth ? 'enabled' : 'disabled'} auth`,
		}
	} catch (e) {
		console.error(e)

		return {
			ok: false,
			title: 'Error',
			message: 'Something went wrong while updating your room api keys',
		}
	}
}

export const createSecretKey = async (
	values: IValues
): Promise<ServerActionResponse> => {
	try {
		const { secretKey } = generateKeys()

		await db.insert(schema.secretkeys).values({
			roomId: values.roomId,
			value: secretKey,
			description: values.description,
			expires: values.expires,
			ipAddress: values.adresses.join('|'),
		})

		revalidatePath('/dashboard/room/[slug]/keys', 'page')

		return {
			ok: true,
			title: 'Success',
			message: 'Successfully created secret key',
		}
	} catch (e) {
		console.error(e)
		return {
			ok: false,
			title: 'Error',
			message: 'Something went wrong while creating your secret key',
		}
	}
}

export const removeSecretKey = async (
	roomId: string,
	id: string
): Promise<ServerActionResponse> => {
	try {
		await db
			.delete(schema.secretkeys)
			.where(
				and(
					eq(schema.secretkeys.roomId, roomId),
					eq(schema.secretkeys.id, id)
				)
			)
		revalidatePath('/dashboard/room/[slug]/keys', 'page')

		return {
			ok: true,
			title: 'Success',
			message: 'Successfully removed secret key',
		}
	} catch (e) {
		console.error(e)
		return {
			ok: false,
			title: 'Error',
			message: 'Something went wrong while removing your secret key',
		}
	}
}
