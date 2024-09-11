import Link from 'next/link'
import { ChevronRight, Mail, EthernetPort, LetterText } from 'lucide-react'
import { RoomWithMessages } from '~types'
import { Brightness } from '~/components/ui/brightness'

interface Props {
	rooms: RoomWithMessages[]
}

export function Rooms({ rooms }: Props) {
	return (
		<section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
			{rooms.map((room) => (
				<Link
					href={`/dashboard/room/${room.slug}`}
					key={room.id}
					className='w-full border h-36 rounded-lg bg-accent/5 group px-5 py-4 hover:bg-accent/10 transition-colors duration-150 relative overflow-hidden'
				>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-2 relative'>
							<Brightness
								className='w-2 h-2 rounded-full bg-green-500 p-0'
								classNameBrightness='bg-green-500 blur'
							/>
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
							<LetterText className='w-4 h-4 stroke-muted-foreground' />
							<span className='text-xs text-muted-foreground truncate max-w-[250px]'>
								{room.description ?? 'No description'}
							</span>
						</div>
						<div className='flex gap-2'>
							<EthernetPort className='w-4 h-4 stroke-muted-foreground' />
							<span className='text-xs text-muted-foreground'>
								{room.connections}/{room.maxConnections} connections
								active
							</span>
						</div>
						<div className='flex gap-2'>
							<Mail className='w-4 h-4 stroke-muted-foreground' />
							<span className='text-xs text-muted-foreground'>
								{room.messages} messages stored
							</span>
						</div>
					</div>
					<span className='absolute right-5 bottom-5 w-full h-5 rounded-full bg-primary/5 blur-2xl'></span>
				</Link>
			))}
		</section>
	)
}
