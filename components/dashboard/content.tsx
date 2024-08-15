import { ScrollArea } from '~ui/scroll-area'

interface Props {
	children: React.ReactNode
}

export function Content({ children }: Props) {
	return (
		<div className='flex flex-1 flex-col'>
			<div className='h-12 max-h-12 border-b'>
				<div className='w-full h-full flex items-center justify-between px-6'>
					<span className='text-xs text-muted-foreground font-medium'>
						Rooms
					</span>
				</div>
			</div>
			<ScrollArea className='flex-1 flex-grow p-5 overflow-y-auto'>
				{children}
			</ScrollArea>
		</div>
	)
}
