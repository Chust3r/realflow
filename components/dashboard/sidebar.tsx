import { RealFlow } from '~icons'
import { Badge } from '~ui/badge'
import { SidebarItems } from '~dashboard/sidebar-items'
import { Profile } from '~components/account/profile'
import { getSession } from '~lib/session'

import Link from 'next/link'

interface Props {
	slug: string
	type: 'dashboard' | 'rooms'
	children?: React.ReactNode
}

export async function Sidebar({ slug, type, children }: Props) {
	const user = await getSession()

	return (
		<div className='w-60 border-r flex flex-col relative'>
			<div className='h-12 min-h-12 border-b flex items-center px-6 gap-3'>
				<Link href='/dashboard' className='flex items-center gap-3'>
					<RealFlow className='w-7 h-7 stroke-foreground fill-foreground' />
					<h4 className='text-lg truncate'>RealFlow</h4>
				</Link>
				<Badge variant='custom' className='relative'>
					<span className='absolute inset-0 w-4 h-4 rounded-full bg-primary blur-2xl'></span>
					beta
				</Badge>
			</div>
			<div className='flex-1 flex flex-col justify-between overflow-y-auto'>
				<SidebarItems type={type} slug={slug} />
				<div className='px-4 py-5'>{children}</div>
			</div>
			<div className='border-t px-4 py-2 flex items-center w-full'>
				<Profile
					user={{
						name: user?.name!,
						email: user?.email!,
						image: user?.image!,
					}}
				/>
			</div>
			<span className='absolute -bottom-5 w-full h-4 rounded-full bg-primary/20 blur-2xl'></span>
		</div>
	)
}
