import { NoRooms } from '~components/dashboard/rooms/noRooms'
import { ShowForm } from '~components/dashboard/showForm'

function Page() {
	return (
		<div className='w-full h-full flex flex-col gap-3'>
			<div>
				<ShowForm size='xs' variant='secondary'>
					New room
				</ShowForm>
			</div>
			<h4 className='text-lg text-foreground font-medium tracking-tight'>
				Rooms
			</h4>
			<section className='flex-1 flex-grow'>
				<NoRooms />
			</section>
		</div>
	)
}

export default Page
