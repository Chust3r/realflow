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
					<RealFlow className='w-7 h-7' />
					<h4 className='text-lg truncate font-medium'>RealFlow</h4>
					<Badge variant='secondary'>beta</Badge>
				</div>
				<div className='flex flex-col gap-2'>
					<h1 className='text-2xl tracking-wide font-medium'>
						Sign up to RealFlow
					</h1>
					<span className='text-sm text-muted-foreground'>
						Reconnect with your channels - Sign up to manage and
						communicate in real-time!
					</span>
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
			<Grid
				strokeDasharray={'4 2'}
				width={80}
				height={80}
				className='[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
			/>
		</section>
	)
}
