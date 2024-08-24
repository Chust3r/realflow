import { db } from '~db'

export const getASecretKeys = async (roomId: string) => {
	const keys = await db.query.secretkeys.findMany({
		where: (key, { eq }) => eq(key.roomId, roomId),
		orderBy: (key, { desc }) => desc(key.createdAt),
	})

	return keys
}
