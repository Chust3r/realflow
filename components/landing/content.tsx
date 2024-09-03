import { Button } from '../ui/button'
import Link from 'next/link'
import { Github } from '~icons'

export function Content() {
	return (
		<section className='w-full h-full mx-auto max-w-5xl flex flex-col items-center justify-center gap-8 flex-grow'>
			<div className='max-w-4xl flex flex-col gap-3 items-center'>
				<h1 className='text-5xl tracking-wide font-medium text-center text-balance'>
					Effortless WebSocket Management
				</h1>
				<h2 className='text-muted-foreground text-5xl tracking-wide font-medium text-center text-balance'>
					Powered by Socket.IO
				</h2>
			</div>
			<div className='max-w-3xl flex flex-col gap-5 items-center'>
				<p className='text-muted-foreground text-center text-sm md:text-base text-pretty'>
					Realflow is an open-source project that simplifies WebSocket
					management. Powered by Socket.IO, it provides developers with an
					easy way to create, monitor, and manage WebSocket connections for
					real-time communication in web applications.
				</p>
				<div className='flex gap-3'>
					<Button asChild>
						<Link href='/dashboard'>Create a Room</Link>
					</Button>

					<Button asChild>
						<Link
							href='https://github.com/Chust3r/realflow'
							target='_blank'
						>
							<Github className='size-4 mr-2 fill-black' />
							Star on Github
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
