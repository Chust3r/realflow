'use server'
import { prisma } from '~prisma'
import { generateKeys } from '~lib/keys'
import { getSession } from '~lib/session'
import { generateSlug } from '~lib/slug'

type TReturn = {
	status: 'success' | 'error'
	message?: string
}

interface IValues {
	name: string
	description?: string
	authentication: boolean
	messagePersistence: boolean
	webhook: boolean
}

export const createRoom = async (values: IValues): Promise<TReturn> => {
	const user = await getSession()

	try {
		const { publicKey, secretKey } = generateKeys()

		const slug = generateSlug()

		const room = await prisma.room.create({
			data: {
				name: values.name,
				description: values.description || null,
				slug,
				userId: user.id,
				publicKey,
				saveMessages: values.messagePersistence,
				enableAuth: values.authentication,
				enableWebHooks: values.webhook,
				secretKeys: {
					create: {
						value: secretKey,
					},
				},
			},
		})

		if (!room) throw new Error('Something went wrong')

		return {
			status: 'success',
		}
	} catch (e) {
		return {
			status: 'error',
			message: 'Something went wrong',
		}
	}
}
