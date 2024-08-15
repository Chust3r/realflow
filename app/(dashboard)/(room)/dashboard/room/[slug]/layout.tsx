import { RoomLayout } from '~layouts/room'

interface Props {
	children: React.ReactNode
	params: {
		slug: string
	}
}

function Layout({ children, params }: Props) {
	return <RoomLayout slug={params.slug}>{children}</RoomLayout>
}

export default Layout
