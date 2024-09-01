import { DeleteRoom } from './delete-room'

interface Props {
	roomId: string
}

export function DangerZone({ roomId }: Props) {
	return (
		<section className='w-full rounded-lg border bg-accent/10'>
			<div className='px-6 py-4 border-b flex items-center'>
				<h3 className='text-base font-medium tracking-wide text-foreground'>
					Danger Zone
				</h3>
			</div>
			<div className='px-6 py-4'>
				<div className='bg-destructive/15 border border-destructive/50 rounded-xl px-3 py-2 flex flex-col gap-3'>
					<p className='text-sm font-medium'>Delete Room</p>
					<span className='text-xs text-muted-foreground'>
						Deleting this room will permanently remove all associated
						data, including messages, configurations, and any other
						content linked to this project. This action is irreversible,
						and once completed, the room and all its data cannot be
						recovered. Ensure that you have backed up any necessary
						information before proceeding. Only proceed if you fully
						understand and accept the consequences of this action.
					</span>
					<DeleteRoom roomId={roomId}/>
				</div>
			</div>
		</section>
	)
}
