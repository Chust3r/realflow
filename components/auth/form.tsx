'use client'

import { Github, Google } from '~icons'
import { Button } from '~ui/button'
import { github, google } from '~actions/auth'
import { RealFlow } from '~icons'
import { Badge } from '~ui/badge'

export const AuthForm = () => {
	return (
		<section className='w-full h-full grid relative overflow-hidden place-content-center'>
			<div className='flex flex-col items-center gap-6 w-[400px] p-6'>
				<div className='h-12 max-h-12 flex items-center gap-1.5 w-full'>
					<RealFlow className='size-8 stroke-foreground fill-foreground' />
					<h4 className='text-xl truncate'>RealFlow</h4>
					<Badge variant='custom' className='relative'>
						<span className='absolute inset-0 w-4 h-4 rounded-full bg-primary blur-2xl'></span>
						beta
					</Badge>
				</div>
				<div className='flex flex-col gap-2'>
					<h1 className='text-2xl tracking-wide font-medium'>
						Sign up to RealFlow
					</h1>
					<span className='text-sm text-muted-foreground'>
						Join Realflow and elevate your app’s real-time communication!
						Sign up now and start building faster, more secure
						connections.
					</span>
				</div>
				<div className='space-y-2'>
					<Button onClick={() => google()} className='w-full'>
						<Google className='w-4 h-4 mr-2' /> Continue with Google
					</Button>
					<Button className='w-full' onClick={() => github()}>
						<Github className='w-4 h-4 mr-2 fill-black' /> Continue with
						Github
					</Button>
				</div>
			</div>
		</section>
	)
}
