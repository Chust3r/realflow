import { ShowForm } from '~/components/dashboard/show-form'
import { NoRooms } from '~/components/dashboard/rooms/no-rooms'
import { Rooms } from '~components/dashboard/rooms/rooms'
import { getRooms } from '~lib/rooms'

async function Page() {
	const rooms = await getRooms()

	return (
		<div className='w-full h-full flex flex-col gap-3'>
			<div>
				<ShowForm size='xs'>New room</ShowForm>
			</div>
			<h4 className='text-lg text-foreground font-medium tracking-tight'>
				Rooms
			</h4>
			<section className='flex-1 flex-grow'>
				{rooms.length === 0 ? <NoRooms /> : <Rooms rooms={rooms} />}
			</section>
		</div>
	)
}

export default Page
