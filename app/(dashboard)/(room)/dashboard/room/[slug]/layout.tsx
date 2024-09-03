import { SocketProvider } from '~/components/dashboard/room/socket-provider'
import { RoomLayout } from '~layouts/room'
import { getRoomAccess } from '~lib/rooms'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
	children: React.ReactNode
	params: {
		slug: string
	}
}

async function Layout({ children, params }: Props) {
	const room = await getRoomAccess(params.slug)

	if (!room || !room?.secretkeys.length) notFound()

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

//→ metadata

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const room = await getRoomAccess(params.slug)

	return {
		title: {
			template: `%s | ${room?.name} | RealFlow`,
			default: `Overview | ${room?.name || 'Unknown'} | RealFlow`,
		},
	}
}
