import { RoomSettings } from '~dashboard/room/settings/room-settings'
import { DangerZone } from '~dashboard/room/settings/danger-zone'
import { getRoomBySlug } from 'lib/rooms'

interface Props {
	params: {
		slug: string
	}
}

async function Page({ params: { slug } }: Props) {
	const room = await getRoomBySlug(slug)

	return (
		<div className='overflow-x-hidden space-y-4 max-w-4xl p-4'>
			<RoomSettings
				id={room?.id!}
				name={room?.name!}
				description={room?.description!}
			/>
			<DangerZone roomId={room?.id!} roomName={room?.name!}/>
		</div>
	)
}

export default Page
