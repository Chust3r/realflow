import { getSession } from '~lib/session'
import { db } from '~db'


export const getRooms = async () => {
	const user = await getSession()

	const rooms = await db.query.rooms.findMany({
		where: (room, { eq }) => eq(room.userId, user.id),
	})

	return rooms
}

export const getRoomBySlug = async (slug: string) => {
	const user = await getSession()

	const room = await db.query.rooms.findFirst({
		where: (room, { eq, and }) =>
			and(eq(room.slug, slug), eq(room.userId, user.id)),
	})

	return room
}
