import { redirect } from 'next/navigation'
import { auth } from '~auth'
import { prisma } from '~prisma'

export const getSession = async () => {
	const session = await auth()

	if (!session?.user?.email) redirect('/auth')

	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email as string,
		},
	})

	if (!user) redirect('/auth')

	return user
}
