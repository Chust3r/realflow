import { SocketProvider } from '~dashboard/room/socketProvider'
import { RoomLayout } from '~layouts/room'
import { getRoomAccess } from '~lib/rooms'

interface Props {
	children: React.ReactNode
	params: {
		slug: string
	}
}

async function Layout({ children, params }: Props) {
	const room = await getRoomAccess(params.slug)

	if (room?.secretkeys.length === 0) {
		return
	}

	return (
		<SocketProvider
			auth={{
				publicKey: room?.publicKey!,
				secretKey: room?.secretkeys[0].value!,
			}}
		>
			<RoomLayout slug={params.slug}>{children}</RoomLayout>
		</SocketProvider>
	)
}

export default Layout
