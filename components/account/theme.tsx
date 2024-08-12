import { ThemeSwitcher } from '~components/theme/switcher'

export function Theme() {
	return (
		<section className='w-full rounded-lg border bg-accent/10'>
			<div className='px-6 py-4 border-b flex items-center'>
				<h3 className='text-base font-medium tracking-wide text-foreground'>
					Theme
				</h3>
			</div>
			<div className='px-6 py-4 grid'>
				<div className='grid-cols-12 gap-x-6 gap-y-2 grid items-center'>
					<label className='col-span-4 text-sm font-medium'>
						Interface theme
					</label>
					<ThemeSwitcher className='col-span-8 lg:w-1/2  w-full bg-accent/10' />
					<div className='col-start-5 col-end-12 flex gap-2 items-center mt-2'>
						<span className='text-xs text-muted-foreground'>
							Choose your preferred theme to enhance your user
							experience.
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}
