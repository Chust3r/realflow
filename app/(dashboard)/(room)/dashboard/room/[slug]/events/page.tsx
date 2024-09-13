import { Alert, AlertDescription, AlertTitle } from '~ui/alert'
import { Console } from '~dashboard/room/events/console'
import { Metadata } from 'next'

function Page() {
	return (
		<article className='h-full flex flex-col gap-4'>
			<Alert className='col-span-12 bg-accent/5'>
				<AlertTitle>Events</AlertTitle>
				<AlertDescription className='text-muted-foreground'>
					Monitor and track real-time events emitted through your room.
				</AlertDescription>
			</Alert>
			<Console />
		</article>
	)
}

export default Page

//→ metadata

export const metadata: Metadata = {
	title: 'Events',
}

