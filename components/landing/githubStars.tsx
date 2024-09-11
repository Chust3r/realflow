import { getStars } from '~lib/github'
import { Button } from '~ui/button'
import Link from 'next/link'
import { Github, Star } from '~icons'

export async function GithubStars() {
	const stars = await getStars()

	return (
		<Button
			asChild
			variant='ghost'
			size='xs'
			className='flex gap-2 items-center group'
		>
			<Link href='https://github.com/Chust3r/realflow' target='_blank'>
				<Github className='size-4' />
				<span>{stars}</span>
				<Star className='size-4 fill-neutral-300 stroke-neutral-300 group-hover:fill-yellow-300 group-hover:stroke-yellow-300 transition duration-300 group-hover:rotate-180' />
			</Link>
		</Button>
	)
}
