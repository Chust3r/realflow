import { Component } from '~/components/dashboard/room/metrics'
import { getRoomBySlug } from '~lib/rooms'

interface Props {
	params: {
		slug: string
	}
}

async function Page({ params }: Props) {
	const room = await getRoomBySlug(params.slug)

	return <div className='overflow-x-hidden'>
		<Component/>
	</div>
}

export default Page
