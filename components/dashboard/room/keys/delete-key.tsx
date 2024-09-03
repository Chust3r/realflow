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
import { Trash } from 'lucide-react'
import { removeSecretKey } from '~actions/api-keys'
import { toast } from 'sonner'

interface Props {
	roomId: string
	id: string
}

export function DeleteKey({ id, roomId }: Props) {
	const deleteSecretKey = async () => {
		const { ok, title, message } = await removeSecretKey(roomId, id)

		if (ok)
			toast.success(title, {
				description: message,
			})

		if (!ok)
			toast.error(title, {
				description: message,
			})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='ghost'
					size='xs'
					className='max-w-[200px] place-self-end'
				>
					<Trash className='size-4 stroke-muted-foreground' />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[450px]'>
				<span className='absolute top-0 right-0 blur-2xl w-10 h-10 bg-primary opacity-15'></span>
				<DialogHeader className='flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b justify-center'>
					<DialogTitle className='text-base'>
						Are you sure you want to delete this key?
					</DialogTitle>
				</DialogHeader>
				<div className='px-5 py-4 border-b flex flex-col gap-2'>
					<div>
						<p className='text-sm text-muted-foreground'>
							This action is irreversible, and any services or
							integrations depending on this key will no longer function.
						</p>
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
						onClick={deleteSecretKey}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
