import { Sidebar } from '~dashboard/sidebar'
import { Content } from '~dashboard/content'

interface Props {
	children: React.ReactNode
}

export function DashboardLayout({ children }: Props) {
	return (
		<div className='w-full h-dvh min-h-fit overflow-hidden'>
			<div className='h-full flex relative'>
			<span className='absolute w-full inset-0 h-10 -z-10 rounded-full blur-3xl bg-primary/20 -top-14 '></span>
			
				<Sidebar slug='' type='dashboard' />
				<Content>{children}</Content>
			</div>
		</div>
	)
}
