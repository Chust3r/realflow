import { Sidebar } from '~components/dashboard/sidebar'
import { Content } from '~components/dashboard/content'

interface Props {
	children: React.ReactNode
}

export function DashboardLayout({ children }: Props) {
	return (
		<div className='w-full h-dvh min-h-fit overflow-hidden'>
			<div className='h-full flex'>
				<Sidebar />
				<Content>{children}</Content>
			</div>
		</div>
	)
}
