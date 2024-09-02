'use client'

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '~ui/dialog'
import { Button } from '../ui/button'
import { useRoomStore, setRoomStore } from '~stores/room'

interface Props {
	reset: () => void
}

export function ConfirmDialog({ reset }: Props) {
	const { confirmOpen } = useRoomStore()

	return (
		<Dialog
			open={confirmOpen}
			onOpenChange={(open) => setRoomStore({ confirmOpen: open })}
		>
			<DialogContent className='sm:max-w-[450px]'>
				<span className='absolute top-0 right-0 blur-2xl w-10 h-10 bg-primary opacity-15'></span>
				<DialogHeader className='flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b justify-center'>
					<DialogTitle className='text-base'>Discard changes</DialogTitle>
				</DialogHeader>
				<div className='px-5 py-4 border-b'>
					<p className='text-sm text-muted-foreground'>
						There are unsaved changes. Are you sure you want to close the
						panel? Your changes will be lost.
					</p>
				</div>
				<DialogFooter className='px-5 py-4 flex w-full'>
					<Button
						size='xs'
						variant='ghost'
						onClick={() => setRoomStore({ confirmOpen: false })}
					>
						Cancel
					</Button>
					<Button
						size='xs'
						onClick={() => {
							setRoomStore({
								confirmOpen: false,
								open: false,
								confirm: true,
							})
							reset()
						}}
					>
						Discard
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
