import { ShowForm } from '~/components/dashboard/show-form'
import { NoRooms } from '~/components/dashboard/rooms/no-rooms'
import { Rooms } from '~components/dashboard/rooms/rooms'
import { getRooms } from '~lib/rooms'
import { getSession } from '~lib/session'

async function Page() {
	const rooms = await getRooms()
	const user = await getSession()

	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='flex justify-between items-center'>
				<ShowForm size='xs'>New room</ShowForm>
			</div>
			<h4 className='text-lg text-foreground font-medium tracking-tight'>
				{user?.name}'s Rooms
			</h4>
			<section className='flex-1 flex-grow'>
				{rooms.length === 0 ? <NoRooms /> : <Rooms rooms={rooms} />}
			</section>
		</div>
	)
}

export default Page
