import { Badge } from '~ui/badge'
import { Switch } from '~ui/switch'

export function NewsLetter() {
	return (
		<section className='w-full rounded-lg border bg-accent/10'>
			<div className='px-6 py-4 border-b flex items-center gap-2'>
				<h3 className='text-base font-medium tracking-wide text-foreground'>
					NewsLetter
				</h3>
				<Badge variant='custom' className='relative'>
					<span className='absolute inset-0 w-4 h-4 rounded-full bg-primary blur-2xl'></span>
					in development
				</Badge>
			</div>
			<div className='px-6 py-4 grid'>
				<div className='grid-cols-12 gap-x-6 gap-y-2 grid items-center'>
					<Switch id='subscribe' disabled />
					<div className='flex flex-col gap-1 col-span-11'>
						<label
							className='text-sm font-medium text-muted-foreground'
							htmlFor='subscribe'
						>
							Suscribe to our newsletter
						</label>
						<span className='text-xs text-muted-foreground'>
							Subscribe to the Realflow newsletter for the latest
							updates, tips, and features to enhance your real-time
							communication channels. Stay connected and ahead!
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}
