import { getStars } from '~lib/github'
import { Button } from '~ui/button'
import Link from 'next/link'
import { Github } from '~icons'

export async function GithubStars() {
	const stars = await getStars()

	return (
		<Button asChild variant='ghost' size='xs'>
			<Link href='https://github.com/Chust3r/realflow' target='_blank'>
				<Github className='size-4 mr-2' />
				<span>{stars}</span>
			</Link>
		</Button>
	)
}
