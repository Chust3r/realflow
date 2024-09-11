import { RealFlow } from '~icons'
import { Badge } from '~ui/badge'
import { SignupOrDashboard } from './signupOrDashboard'
import { GithubStars } from './githubStars'

export function Header() {
	return (
		<header className='border-b py-3'>
			<div className='max-w-5xl mx-auto flex justify-between px-3 md:px-0'>
				<div className='flex gap-2 items-center'>
					<RealFlow className='size-8 stroke-foreground fill-foreground' />
					<h4 className='text-xl truncate'>RealFlow</h4>
					<Badge variant='custom' className='relative'>
						<span className='absolute inset-0 w-4 h-4 rounded-full bg-primary blur-2xl'></span>
						beta
					</Badge>
				</div>
				<div className='flex items-center gap-3'>
					<GithubStars />
					<SignupOrDashboard />
				</div>
			</div>
		</header>
	)
}
