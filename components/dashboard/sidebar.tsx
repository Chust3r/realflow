'use client'
import Link from 'next/link'
import { RealFlow } from '~icons'
import { getItems } from '~consts/sidebar'
import { Badge } from '~ui/badge'
import { ScrollArea } from '~ui/scroll-area'
import { logOut } from '~actions/auth'
import { usePathname } from 'next/navigation'
import { cn } from '~lib/utils'
import { LogOut } from 'lucide-react'

interface Props {
	slug: string
	type: 'dashboard' | 'rooms'
}

export function Sidebar({ slug, type }: Props) {
	const pathname = usePathname()

	const handleLogOut = async () => {
		await logOut()
	}

	const items = getItems(type, slug)

	return (
		<div className='w-64 border-r flex flex-col'>
			<div className='h-12 max-h-12 border-b flex items-center px-6 gap-3 '>
				<RealFlow className='w-7 h-7 stroke-foreground fill-foreground' />
				<h4 className='text-lg truncate font-medium'>RealFlow</h4>
				<Badge variant='secondary'>beta</Badge>
			</div>
			<ScrollArea className='flex-1 flex-col flex-grow -mt-1'>
				<ul className='space-y-1 py-5 px-4'>
					{items.map((item) => (
						<Link
							key={item.title}
							href={item.path}
							className={cn(
								'text-sm truncate text-muted-foreground  flex items-center py-2 px-2 rounded transition-colors duration-300 hover:bg-accent/20 hover:text-foreground',
								{
									'bg-accent/20 text-foreground':
										pathname === item.path,
								}
							)}
						>
							<item.icon className='w-4 h-4 mr-2' />
							<span className={cn('truncate font-medium')}>
								{item.title}
							</span>
						</Link>
					))}
				</ul>
			</ScrollArea>
			<div className='px-6 py-4 border-t'>
				<div
					className='flex items-center gap-2 group'
					role='button'
					onClick={handleLogOut}
				>
					<LogOut className='w-4 h-4 stroke-muted-foreground group-hover:stroke-foreground transition duration-300' />
					<span className='text-sm text-muted-foreground group-hover:text-foreground transition duration-300 font-medium'>
						Logout
					</span>
				</div>
			</div>
		</div>
	)
}
