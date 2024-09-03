import { RealFlow } from '~icons'
import { Badge } from '~ui/badge'
import { SignupOrDashboard } from './signupOrDashboard'

export function Header() {
	return (
		<header className='border-b py-3'>
			<div className='max-w-5xl mx-auto flex justify-between'>
				<div className='flex gap-2 items-center'>
					<RealFlow className='size-8 stroke-foreground fill-foreground' />
					<h4 className='text-xl truncate'>RealFlow</h4>
					<Badge variant='custom' className='relative'>
						<span className='absolute inset-0 w-4 h-4 rounded-full bg-primary blur-2xl'></span>
						beta
					</Badge>
				</div>
				<div>
					<SignupOrDashboard />
				</div>
			</div>
		</header>
	)
}
