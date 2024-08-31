'use client'

import { Github, Google } from '~icons'
import { Button } from '~ui/button'
import { github, google } from '~actions/auth'
import { Grid } from '~/components/ui/grid'
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
					<Button className='w-full'>
						<Github className='w-4 h-4 mr-2 fill-black' /> Continue with
						Github
					</Button>
				</div>
			</div>
			<Grid
				strokeDasharray={'4 2'}
				width={80}
				height={80}
				className='[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
			/>
			<span className='absolute inset-0 w-full h-5 rounded-full bg-primary opacity-30 blur-3xl -top-5'></span>
			<span className='absolute w-full h-5 rounded-full bg-primary opacity-20 blur-3xl -bottom-5'></span>
		</section>
	)
}
