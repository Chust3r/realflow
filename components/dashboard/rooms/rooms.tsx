import { Room } from '@prisma/client'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Props {
	rooms: Room[]
}

export async function Rooms({ rooms }: Props) {
	return (
		<section className='w-full h-full grid grid-cols-3 gap-3'>
			{rooms.map((room) => (
				<Link
					href={`/dashboard/room/${room.slug}`}
					key={room.id}
					className='w-full border h-36 rounded-lg bg-accent/10 group px-5 py-4 hover:bg-accent/20 transition-colors duration-150'
				>
					<div className=' flex justify-between items-center'>
						<span className='text-sm text-muted-foreground font-medium tracking-wide '>
							{room.name}
						</span>
						<div className='pr-1 group-hover:pr-0 transition-all duration-300'>
							<ChevronRight className='w-4 h-4 stroke-muted-foreground group-hover:stroke-foreground/80 transition-all duration-300' />
						</div>
					</div>
				</Link>
			))}
		</section>
	)
}
