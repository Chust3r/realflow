import { Sidebar } from '~dashboard/sidebar'
import { Content } from '~dashboard/content'

interface Props {
	children: React.ReactNode
	slug: string
}

export function RoomLayout({ children, slug }: Props) {
	return (
		<div className='w-full h-dvh min-h-fit overflow-hidden'>
			<div className='h-full flex'>
				<Sidebar slug={slug} type='rooms' />
				<Content>{children}</Content>
			</div>
		</div>
	)
}
