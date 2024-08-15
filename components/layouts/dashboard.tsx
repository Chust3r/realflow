import { Sidebar } from '~dashboard/sidebar'
import { Content } from '~dashboard/content'

interface Props {
	children: React.ReactNode
}

export function DashboardLayout({ children }: Props) {
	return (
		<div className='w-full h-dvh min-h-fit overflow-hidden'>
			<div className='h-full flex'>
				<Sidebar slug='' type='dashboard' />
				<Content>{children}</Content>
			</div>
		</div>
	)
}
