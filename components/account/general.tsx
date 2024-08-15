import { getSession } from '~lib/session'
import { GeneralForm } from './general-form'

export async function General() {
	const user = await getSession()

	return (
		<section className='w-full rounded-lg border bg-accent/10'>
			<div className='px-6 py-4 border-b flex items-center'>
				<h3 className='text-base font-medium tracking-wide text-foreground'>
					Account Information
				</h3>
			</div>
			<GeneralForm
				defaultValues={{
					username: user.name!,
					email: user.email!,
				}}
				image={user.image!}
			/>
		</section>
	)
}
