import { ColumnDef } from '@tanstack/react-table'
import { Event } from '~stores/events'
import { Button } from '~ui/button'
import { Badge } from '~ui/badge'
import { CalendarArrowDown, CalendarArrowUp, CaseLower } from 'lucide-react'
import { formatDate } from 'date-fns'

export const columns: ColumnDef<Event>[] = [
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<div
				className='flex items-center gap-2'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				<Button variant='ghost' size='xs'>
					{column.getIsSorted() === 'desc' ? (
						<CalendarArrowUp className='w-4 h-4 stroke-muted-foreground' />
					) : (
						<CalendarArrowDown className='w-4 h-4 stroke-muted-foreground' />
					)}
				</Button>
				<span>Date</span>
			</div>
		),
		cell: ({ row }) => {
			return (
				<span className='text-muted-foreground'>
					{formatDate(new Date(row.original.date), 'dd MMM yyyy HH:mm:ss')}
				</span>
			)
		},
	},
	{
		accessorKey: 'event',
		header: () => (
			<div className='flex items-center gap-2'>
				<CaseLower className='w-4 h-4 stroke-muted-foreground' />
				<span>Event</span>
			</div>
		),
		cell: ({ row }) => {
			return <Badge variant='custom'>{row.original.event}</Badge>
		},
	},
]
