'use client'
import Link from 'next/link'
import { ScrollArea } from '~ui/scroll-area'
import { cn } from '~lib/utils'
import { getItems } from '~consts/sidebar'
import { usePathname } from 'next/navigation'

interface Props {
	type: 'dashboard' | 'rooms'
	slug: string
}

export function SidebarItems({ type, slug }: Props) {
	const pathname = usePathname()

	const items = getItems(type, slug)

	return (
		<ScrollArea className='flex-1 flex-col flex-grow -mt-1'>
			<ul className='space-y-1 py-5 px-4'>
				{items.map((item) => (
					<Link
						key={item.title}
						href={item.path}
						className={cn(
							'text-sm truncate text-muted-foreground  flex items-center py-2 px-2 rounded  hover:bg-secondary/30 duration-150 relative',
							{
								'bg-secondary/40 text-foreground hover:bg-secondary/40':
									pathname === item.path,
							}
						)}
					>
						<item.icon
							className={cn(
								'w-4 h-4 mr-2 stroke-muted-foreground stroke-[1.5px]',
								{
									'stroke-foreground': pathname === item.path,
								}
							)}
						/>
						<p className='truncate'>{item.title}</p>
					</Link>
				))}
			</ul>
		</ScrollArea>
	)
}
