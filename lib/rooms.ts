import { prisma } from '~prisma'
import { getSession } from '~lib/session'

export const getRooms = async () => {
	const user = await getSession()

	const rooms = await prisma.room.findMany({
		where: {
			userId: user.id,
		},
	})

	return rooms
}

export const getRoomBySlug = async (slug: string) => {
	const user = await getSession()

	const room = await prisma.room.findFirst({
		where: {
			slug,
			userId: user.id,
		},
	})

	return room
}
