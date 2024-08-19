import Link from 'next/link'
import {
	ChevronRight,
	Server,
	MessageCircle,
	Workflow,
	CaseLower,
} from 'lucide-react'
import { Room } from '~types'

interface Props {
	rooms: Room[]
}

export async function Rooms({ rooms }: Props) {
	return (
		<section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
			{rooms.map((room) => (
				<Link
					href={`/dashboard/room/${room.slug}`}
					key={room.id}
					className='w-full border h-36 rounded-lg bg-accent/10 group px-5 py-4 hover:bg-accent/20 transition-colors duration-150'
				>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-2'>
							<Server className='w-4 h-4 stroke-muted-foreground' />
							<span className='text-sm text-muted-foreground font-medium tracking-wide block'>
								{room.name}
							</span>
						</div>
						<div className='pr-1 group-hover:pr-0 transition-all duration-300'>
							<ChevronRight className='w-4 h-4 stroke-muted-foreground group-hover:stroke-foreground/80 transition-all duration-300' />
						</div>
					</div>
					<div className='flex flex-col gap-2 py-3'>
						<div className='flex gap-2'>
							<CaseLower className='w-4 h-4 stroke-muted-foreground' />
							<span className='text-xs text-muted-foreground truncate max-w-[250px]'>
								{room.description ?? 'No description'}
							</span>
						</div>
						<div className='flex gap-2'>
							<Workflow className='w-4 h-4 stroke-muted-foreground' />
							<span className='text-xs text-muted-foreground'>
								0 users online
							</span>
						</div>
						<div className='flex gap-2'>
							<MessageCircle className='w-4 h-4 stroke-muted-foreground' />
							<span className='text-xs text-muted-foreground'>
								0 messages
							</span>
						</div>
					</div>
				</Link>
			))}
		</section>
	)
}
