'use server'

import { prisma } from '~prisma'
import { getSession } from '~lib/session'

interface Params {
	username: string
}

export const updateAccount = async ({ username }: Params) => {
	const session = await getSession()

	await prisma.user.update({
		where: {
			id: session.id!,
		},
		data: {
			name: username,
		},
	})
}
