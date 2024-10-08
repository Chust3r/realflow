import { Alert, AlertDescription, AlertTitle } from '~ui/alert'
import { CodeBlock } from '~ui/code-block'
import { code, client, listen, emit } from '~consts/quickstart'
import Link from 'next/link'
import { Metadata } from 'next'

function Page() {
	return (
		<article className='overflow-x-hidden grid grid-cols-12 gap-4 max-w-4xl p-4'>
			<Alert className='col-span-12 bg-accent/5'>
				<AlertTitle>Quickstart</AlertTitle>
				<AlertDescription className='text-muted-foreground'>
					Welcome to Realflow! This guide will help you quickly set up and
					start using our application for real-time communication. Follow
					these simple steps to get started.
				</AlertDescription>
			</Alert>
			<div className='col-span-12 flex flex-col gap-3'>
				<div className='flex gap-3 items-start'>
					<div className='w-7 h-7 rounded-full bg-accent/10 border grid place-content-center text-xs text-muted-foreground'>
						1
					</div>
					<p className='text-muted-foreground text-sm flex-1'>
						Our application establishes a connection with the Realflow
						server using our native WebSocket library for real-time
						communication. Please ensure you have the library installed to
						get started and enable seamless data exchange in real time.
					</p>
				</div>
				<CodeBlock code={code} />
			</div>
			<div className='col-span-12 flex flex-col gap-3'>
				<div className='flex gap-3 items-start'>
					<div className='w-7 h-7 rounded-full bg-accent/10 border grid place-content-center text-xs text-muted-foreground'>
						2
					</div>
					<p className='text-muted-foreground text-sm flex-1'>
						Configure the Realflow client to connect to the platform by
						specifying the server URL, WebSocket path, and authentication
						keys as shown below. The connection is established using a
						native WebSocket library for seamless real-time communication.
						For more detailed information and advanced usage, please refer
						to the documentation.
					</p>
				</div>
				<CodeBlock code={client} />
			</div>
			<div className='col-span-12 flex flex-col gap-3'>
				<div className='flex gap-3 items-start'>
					<div className='w-7 h-7 rounded-full bg-accent/10 border grid place-content-center text-xs text-muted-foreground'>
						3
					</div>
					<p className='text-muted-foreground text-sm flex-1'>
						Use the Realflow client to listen for events in your room by
						subscribing to specific event names, allowing you to handle
						incoming messages and updates.
					</p>
				</div>
				<CodeBlock code={listen} />
			</div>
			<div className='col-span-12 flex flex-col gap-3'>
				<div className='flex gap-3 items-start'>
					<div className='w-7 h-7 rounded-full bg-accent/10 border grid place-content-center text-xs text-muted-foreground'>
						4
					</div>
					<p className='text-muted-foreground text-sm flex-1'>
						Emit events from your Realflow client to communicate with
						other users or the server by specifying the event name and
						passing the required data.
					</p>
				</div>
				<CodeBlock code={emit} />
			</div>
		</article>
	)
}

export default Page

//→ metadata

export const metadata: Metadata = {
	title: 'Quickstart',
}
