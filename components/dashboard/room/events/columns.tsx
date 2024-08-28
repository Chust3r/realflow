import { ColumnDef } from '@tanstack/react-table'
import { Event } from '~stores/events'
import { Button } from '~ui/button'
import { Badge } from '~ui/badge'
import {
	CalendarArrowDown,
	CalendarArrowUp,
	CaseLower,
	HardDriveDownload,
} from 'lucide-react'
import { formatDate } from 'date-fns'
import { CopyToClipboard } from '~ui/copy-to-clipboard'

export const columns: ColumnDef<Event>[] = [
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<div
				className='flex items-center gap-2'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				<Button variant='ghost' size='xs'>
					{column.getIsSorted() === 'asc' ? (
						<CalendarArrowDown className='w-4 h-4 stroke-muted-foreground' />
					) : (
						<CalendarArrowUp className='w-4 h-4 stroke-muted-foreground' />
					)}
				</Button>
				<span>Date</span>
			</div>
		),
		cell: ({ row }) => {
			return formatDate(new Date(row.original.date), 'dd MMM yyyy HH:mm:ss')
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
	{
		accessorKey: 'payload',
		header: () => (
			<div className='flex items-center gap-2'>
				<HardDriveDownload className='w-4 h-4 stroke-muted-foreground' />
				<span>Payload</span>
			</div>
		),
		cell: ({ row }) => (
			<div className='flex items-center gap-2 justify-between'>
				<span className='text-muted-foreground max-w-[350px] line-clamp-1'>
					{row.original.payload ?? '-'}
				</span>
				<CopyToClipboard data={row.original.payload} />
			</div>
		),
	},
]
