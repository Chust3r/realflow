'use client'
import { useEventStore } from '~stores/events'
import { ScrollArea } from '~ui/scroll-area'
import { DataTable } from './data-table'
import { columns } from './columns'

export function Console() {
	const { events } = useEventStore()

	return (
		<div className='border rounded-lg bg-accent/5 h-full flex-grow overflow-hidden relative'>
			<ScrollArea className='h-full relative'>
				<DataTable columns={columns} data={events} />
			</ScrollArea>
		</div>
	)
}
