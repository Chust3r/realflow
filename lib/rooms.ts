import { getSession } from '~lib/session'
import { db } from '~db'
import { sql } from 'drizzle-orm'
import { RoomWithMessages } from '~types'

export const getRooms = async () => {
	const user = await getSession()

	const query = sql`
	SELECT 
		"r".*,
		COUNT(*) messages
  	FROM
	room r
		INNER JOIN metric m ON "m"."roomId" = "r"."id"
  	WHERE
		"r"."userId" = ${user?.id!}
  	GROUP BY "r"."id"`

	const rooms = await db.execute(query)

	return rooms.rows as RoomWithMessages[]
}

export const getRoomBySlug = async (slug: string) => {
	const user = await getSession()

	const room = await db.query.rooms.findFirst({
		where: (room, { eq, and }) =>
			and(eq(room.slug, slug), eq(room.userId, user.id)),
	})

	return room
}

export const getRoomAccess = async (slug: string) => {
	const room = await db.query.rooms.findFirst({
		where: (room, { eq }) => eq(room.slug, slug),
		with: {
			secretkeys: true,
		},
	})

	return room
}
