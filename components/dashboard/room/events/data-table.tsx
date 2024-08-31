'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~ui/table'
import { useState } from 'react'
import { useEventStore, setEventStore } from '~stores/events'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])

	const { selectedEvent } = useEventStore()

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	})

	const handleClick = (row: any) => {
		const isSelected = row.id === selectedEvent?.id

		if (!isSelected) {
			setEventStore({
				selectedEvent: {
					id: row.id,
					...row.original,
				},
			})
		} else {
			setEventStore({
				selectedEvent: undefined,
			})
		}
	}

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							)
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.id === selectedEvent?.id && 'selected'}
							onClick={() => handleClick(row)}
							className='cursor-pointer data-[state=selected]:bg-accent/20 hover:bg-accent/10'
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className='h-24 text-center'
						>
							No Events.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
