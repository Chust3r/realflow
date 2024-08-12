import { NoChannels } from '~/components/dashboard/channels/noChannels'
import { ShowForm } from '~components/dashboard/showForm'

function Page() {
	return (
		<div className='w-full h-full flex flex-col gap-3'>
			<div>
				<ShowForm size='xs' variant='secondary'>
					New channel
				</ShowForm>
			</div>
			<h4 className='text-lg text-foreground font-medium tracking-tight'>
				Channels
			</h4>
			<section className='flex-1 flex-grow'>
				<NoChannels />
			</section>
		</div>
	)
}

export default Page
