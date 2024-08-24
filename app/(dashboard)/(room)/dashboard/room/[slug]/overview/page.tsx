import { getRoomBySlug } from '~lib/rooms'
import {
	getRequests,
	getMessages,
	getConnections,
	getOrigins,
} from '~lib/metrics'
import { MetricsRequests } from '~dashboard/room/metrics/requests'
import { MetricsConnections } from '~dashboard/room/metrics/connections'
import { MetricsOrigin } from '~dashboard/room/metrics/origin'
import { MetricsMessages } from '~dashboard/room/metrics/messages'

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
	const origins = await getOrigins(room?.id!)

	return (
		<div className='overflow-x-hidden grid grid-cols-12 gap-4'>
			<section className='col-span-12 lg:col-span-6'>
				<MetricsRequests data={requests.requests} total={requests.total} />
			</section>
			<section className='col-span-12 lg:col-span-6'>
				<MetricsConnections data={connections} />
			</section>
			<section className='col-span-12 lg:col-span-7'>
				<MetricsOrigin data={origins} total={requests.total} />
			</section>
			<section className='col-span-12 lg:col-span-5'>
				<MetricsMessages data={messages.messages} total={messages.total} />
			</section>
		</div>
	)
}

export default Page
