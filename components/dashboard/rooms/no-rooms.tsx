import { ShowForm } from '~/components/dashboard/show-form'
import { Plus, Server } from 'lucide-react'
import { Ripple } from '~ui/ripple'

export function NoRooms() {
	return (
		<section className='w-full h-full grid place-content-center p-5 relative'>
			<div className='flex flex-col items-center gap-2'>
				<Server className='w-16 h-16 stroke-muted-foreground' />
				<div className='flex flex-col items-center gap-1 relative'>
					<h5 className='text-foreground font-medium tracking-wide'>
						No Rooms
					</h5>
					<span className='text-sm text-muted-foreground text-center line-clamp-2'>
						Start by creating your first room to enable real-time
						communication.
					</span>
				</div>
				<ShowForm size='xs' className='mt-2'>
					<Plus className='w-4 h-4 mr-1 ' />
					New room
				</ShowForm>
			</div>
			<Ripple />
		</section>
	)
}
