import { Button } from '~ui/button'

export function DangerZone() {
	return (
		<section className='w-full rounded-lg border bg-accent/10'>
			<div className='px-6 py-4 border-b flex items-center'>
				<h3 className='text-base font-medium tracking-wide text-foreground'>
					Danger Zone
				</h3>
			</div>
			<div className='px-6 py-4'>
				<div className='bg-destructive/15 border border-destructive/50 rounded-xl px-3 py-2 flex flex-col gap-3'>
					<p className='text-sm font-medium'>
						Request for account deletion
					</p>
					<span className='text-xs text-muted-foreground'>
						By deleting your account, you are permanently erasing all your
						personal data, including any content or information associated
						with your profile. This action cannot be undone, and you will
						lose access to any services or features tied to your account.
						Please ensure that you have backed up any important
						information before proceeding, as recovery will not be
						possible once the deletion is completed. Proceed only if you
						fully understand and accept the consequences.
					</span>
					<Button
						variant='destructive'
						size='xs'
						className='max-w-[200px] place-self-end'
						disabled
					>
						Request Deletion
					</Button>
				</div>
			</div>
		</section>
	)
}
