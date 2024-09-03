import { auth } from '~auth'
import { Button } from '~ui/button'
import Link from 'next/link'

export async function SignupOrDashboard() {
	const session = await auth()

	return (
		<Button asChild variant='secondary' size='xs'>
			<Link href={`${session ? '/dashboard' : '/auth'}`}>
				{session ? 'Dashboard' : 'Sign Up'}
			</Link>
		</Button>
	)
}
