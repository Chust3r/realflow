import { RealFlow } from '~icons'
import { Badge } from '~ui/badge'
import { SidebarItems } from '~dashboard/sidebar-items'
import { Profile } from '~components/account/profile'
import { getSession } from '~lib/session'

interface Props {
	slug: string
	type: 'dashboard' | 'rooms'
}

export async function Sidebar({ slug, type }: Props) {
	const user = await getSession()

	return (
		<div className='w-60 border-r flex flex-col'>
			<div className='h-12 max-h-12 border-b flex items-center px-6 gap-3 '>
				<RealFlow className='w-7 h-7 stroke-foreground fill-foreground' />
				<h4 className='text-lg truncate'>RealFlow</h4>
				<Badge variant='secondary'>beta</Badge>
			</div>
			<SidebarItems type={type} slug={slug} />
			<div className='border-t px-4 py-2 flex items-center w-full'>
				<Profile
					user={{
						name: user?.name!,
						email: user?.email!,
						image: user?.image!,
					}}
				/>
			</div>
		</div>
	)
}
