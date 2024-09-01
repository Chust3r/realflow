import { RoomsIndicator } from '~dashboard/rooms-indicator'
import { getRooms } from '~lib/rooms'
import { MAX_ROOMS } from '~consts/rooms'

export async function MaxRooms() {
	const rooms = await getRooms()

	return <RoomsIndicator rooms={rooms.length} max={MAX_ROOMS} />
}
