import { Component } from '~/components/dashboard/room/metrics'
import { getRoomBySlug } from '~lib/rooms'
import { getRequests, getMessages, getConnections } from '~lib/metrics'

interface Props {
	params: {
		slug: string
	}
}

async function Page({ params }: Props) {
	const room = await getRoomBySlug(params.slug)

	const requests = await getRequests(room?.id!)

	const messages = await getMessages(room?.id!)

	const connections = await getConnections(room?.id!)

	console.log(requests, messages, connections)

	return (
		<div className='overflow-x-hidden'>
			<Component />
		</div>
	)
}

export default Page
