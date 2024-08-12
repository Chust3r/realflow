import { ShowForm } from '~components/dashboard/showForm'
import { Plus, Tv } from 'lucide-react'

export function NoChannels() {
	return (
		<section className='w-full h-full rounded-lg grid place-content-center border bg-accent/10 p-5'>
			<div className='flex flex-col items-center gap-2'>
				<Tv className='w-16 h-16 stroke-muted' />
				<div className='flex flex-col items-center gap-1'>
					<h5 className='text-foreground font-medium tracking-wide'>
						No channels
					</h5>
					<span className='text-sm text-muted-foreground text-center line-clamp-2'>
						Start by creating your first channel to enable real-time
						communication.
					</span>
				</div>
				<ShowForm size='xs' variant='secondary' className='mt-2'>
					<Plus className='w-4 h-4 mr-1' />
					New channel
				</ShowForm>
			</div>
		</section>
	)
}
