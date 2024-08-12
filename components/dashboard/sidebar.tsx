import Link from 'next/link'
import { items } from '~consts/sidebar'
import { LogOut, RealFlow } from '~icons'
import { Badge } from '~ui/badge'
import { ScrollArea } from '~ui/scroll-area'

export function Sidebar() {
	return (
		<div className='w-64 border-r flex flex-col'>
			<div className='h-12 max-h-12 border-b flex items-center px-6 gap-3'>
				<RealFlow className='w-7 h-7' />
				<h4 className='text-lg truncate font-medium'>RealFlow</h4>
				<Badge variant='secondary'>beta</Badge>
			</div>
			<ScrollArea className='flex-1 flex-col flex-grow -mt-1'>
				{items.map((group) => (
					<div key={group.title} className='py-5 px-6 border-b'>
						<div className='flex space-x-3 mb-2 font-medium'>
							<span className='text-sm text-muted-foreground'>
								{group.title}
							</span>
						</div>
						<ul className='space-y-2'>
							{group.items.map((item) => (
								<li key={item.title}>
									<Link
										href={item.path}
										className='text-sm truncate text-foreground/80 hover:text-foreground transition-colors duration-300'
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</ScrollArea>
			<div className='px-6 py-5 border-t'>
				<div className='flex gap-2 items-center'>
					<LogOut className='stroke-muted-foreground w-4 h-4' />
					<span className='text-sm text-muted-foreground font-medium'>
						Log out
					</span>
				</div>
			</div>
		</div>
	)
}
