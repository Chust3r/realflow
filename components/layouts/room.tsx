import { Sidebar } from '~dashboard/sidebar'
import { Content } from '~dashboard/content'

interface Props {
	children: React.ReactNode
	slug: string
}

export function RoomLayout({ children, slug }: Props) {
	return (
		<div className='w-full h-dvh min-h-fit overflow-hidden'>
			<div className='h-full flex relative'>
				<span className='absolute w-full inset-0 h-10 -z-10 rounded-full blur-3xl bg-primary/20 -top-14 '></span>
				<Sidebar slug={slug} type='rooms' />
				<Content>{children}</Content>
			</div>
		</div>
	)
}