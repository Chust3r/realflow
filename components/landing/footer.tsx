import Link from 'next/link'
import { NextJS } from '~icons'

export function Footer() {
	return (
		<footer className='w-full grid place-content-center max-w-5xl mx-auto py-3'>
			<div className='flex gap-2 items-center'>
				<span className='text-muted-foreground text-xs'>
					Made by Chust3r using
				</span>
				<Link href='https://nextjs.org/docs' target='_blank'>
					<NextJS className='size-4' />
				</Link>
			</div>
		</footer>
	)
}
