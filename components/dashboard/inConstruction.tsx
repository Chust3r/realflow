import { TrafficCone } from 'lucide-react'

export function InConstruction() {
	return (
		<section className='w-full h-full grid place-content-center'>
			<div className='flex flex-col gap-2 items-center'>
				<TrafficCone className='w-16 h-16 stroke-muted' />
				<h3 className='font-medium tracking-wide'>
					This page is under construction
				</h3>
			</div>
		</section>
	)
}
