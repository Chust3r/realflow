'use client'

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '~ui/dialog'
import { Button } from '~ui/button'
import { useSecretStore, setSecretStore } from '~stores/secret'

interface Props {
	reset: () => void
}

export function ConfirmDialog({ reset }: Props) {
	const { confirmOpen } = useSecretStore()

	return (
		<Dialog
			open={confirmOpen}
			onOpenChange={(open) => setSecretStore({ confirmOpen: open })}
		>
			<DialogContent className='sm:max-w-[380px]'>
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
						className='w-full'
						variant='outline'
						onClick={() => setSecretStore({ confirmOpen: false })}
					>
						Cancel
					</Button>
					<Button
						className='w-full'
						variant='secondary'
						onClick={() => {
							setSecretStore({
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
