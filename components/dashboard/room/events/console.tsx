'use client'
import { useEventStore } from '~stores/events'
import { ScrollArea } from '~ui/scroll-area'
import { DataTable } from './data-table'
import { columns } from './columns'
import { ViewEvent } from './view-event'

export function Console() {
	const { events } = useEventStore()

	return (
		<div className='border rounded-lg bg-accent/5 h-full flex-grow overflow-hidden relative'>
			<div className='grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-x lg:divide-y-0 h-full'>
				<ScrollArea className='h-full relative'>
					<DataTable columns={columns} data={events} />
				</ScrollArea>
				<ViewEvent />
			</div>
		</div>
	)
}
