'use client'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from '~ui/dialog'
import { Button } from '~ui/button'
import { Input } from '~ui/input'
import { useState } from 'react'

interface Props {
	roomId: string
	roomName: string
}

export function DeleteRoom({ roomId, roomName }: Props) {
	const [confirmInput, setConfirmInput] = useState('')

	return (
		<Dialog>
			<DialogTrigger asChild disabled>
				<Button
					variant='destructive'
					size='xs'
					className='max-w-[200px] place-self-end'
				>
					Delete Room
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[450px]'>
				<span className='absolute top-0 right-0 blur-2xl w-10 h-10 bg-primary opacity-15'></span>
				<DialogHeader className='flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b justify-center'>
					<DialogTitle className='text-base'>Delete Room</DialogTitle>
				</DialogHeader>
				<div className='px-5 py-4 border-b flex flex-col gap-2'>
					<div>
						<p className='text-sm text-muted-foreground'>
							This action is permanent and will remove all data
							associated with the room, including messages and settings.
							This cannot be undone
						</p>
					</div>
					<div className='flex flex-col gap-2'>
						<p className='text-sm text-muted-foreground'>
							To confirm, type the name of the room:{' '}
							<span className='text-foreground'>{roomName}</span>
						</p>
						<Input
							placeholder='Room Name'
							onChange={(e) => setConfirmInput(e.currentTarget.value)}
						/>
					</div>
				</div>
				<DialogFooter className='px-5 py-4 flex w-full'>
					<DialogClose asChild>
						<Button size='xs' variant='ghost'>
							Cancel
						</Button>
					</DialogClose>
					<Button
						size='xs'
						variant='destructive'
						disabled={confirmInput !== roomName}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
