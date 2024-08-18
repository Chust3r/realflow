import { redirect } from 'next/navigation'
import { auth } from '~auth'

import { db } from '~db'

export const getSession = async () => {
	const session = await auth()

	if (!session?.user?.email) redirect('/auth')

	const user = await db.query.users.findFirst({
		where: (user, { eq }) => eq(user.email, session?.user?.email as string),
	})

	if (!user) redirect('/auth')

	return user
}
