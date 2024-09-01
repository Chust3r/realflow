import { ShowForm } from '~/components/dashboard/show-form'
import { NoRooms } from '~/components/dashboard/rooms/no-rooms'
import { Rooms } from '~components/dashboard/rooms/rooms'
import { getRooms } from '~lib/rooms'
import { getSession } from '~lib/session'
import { MAX_ROOMS } from '~consts/rooms'

async function Page() {
	const rooms = await getRooms()
	const user = await getSession()

	return (
		<div className='w-full h-full flex flex-col gap-3'>
			<div className='flex justify-between items-center'>
				<ShowForm size='xs' disabled={rooms.length === MAX_ROOMS}>
					New room
				</ShowForm>
			</div>
			<h4 className='text-lg text-foreground font-medium tracking-tight'>
				{user?.name}'s Rooms
			</h4>
			<section className='flex-grow h-full'>
				{rooms.length === 0 ? <NoRooms /> : <Rooms rooms={rooms} />}
			</section>
		</div>
	)
}

export default Page
