import { RoomSettingsForm } from './room-settings-form'

interface Props {
	id: string
	name: string
	description?: string
}

export async function RoomSettings({ id, name, description }: Props) {
	return (
		<section className='w-full rounded-lg border bg-accent/10'>
			<div className='px-6 py-4 border-b flex items-center'>
				<h3 className='text-base font-medium tracking-wide text-foreground'>
					Room Settings
				</h3>
			</div>
			<RoomSettingsForm
				defaultValues={{
					id,
					name,
					description,
				}}
			/>
		</section>
	)
}
