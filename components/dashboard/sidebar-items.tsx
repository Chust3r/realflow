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
							'text-sm truncate text-muted-foreground  flex items-center py-2 px-2 rounded  hover:bg-secondary/30 duration-150',
							{
								'bg-secondary/50 text-foreground':
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
						<span className="truncate">{item.title}</span>
					</Link>
				))}
			</ul>
		</ScrollArea>
	)
}
