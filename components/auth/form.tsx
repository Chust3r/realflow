'use client'

import { Github, Google } from '~icons'
import { Button } from '~ui/button'
import { github, google } from '~actions/auth'

export const AuthForm = () => {
	return (
		<div className='w-[400px] flex flex-col items-center justify-center gap-5 rounded-xl min-h-72 px-5 py-3'>
			<div className='flex flex-col items-center gap-2'>
				<h1 className='text-2xl tracking-tighter font-medium'>
					Sign in to RealFlow
				</h1>
				<p className='text-sm text-muted-foreground'>
					Please sign in to continue
				</p>
			</div>
			<div className='space-y-2'>
				<Button
					onClick={() => google()}
					className='w-full'
					variant='secondary'
				>
					<Google className='w-4 h-4 mr-2' /> Continue with Google
				</Button>
				<Button className='w-full' variant='secondary'>
					<Github className='w-4 h-4 mr-2' /> Continue with Github
				</Button>
			</div>
		</div>
	)
}
