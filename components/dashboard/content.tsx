interface Props {
	children: React.ReactNode
}

export function Content({ children }: Props) {
	return (
		<div className='flex flex-1 flex-col'>
			<div className='h-12 min-h-12 border-b'>
				<div className='w-full h-full flex items-center justify-between px-6'>
					<span className='text-xs text-muted-foreground font-medium'>
						Rooms
					</span>
				</div>
			</div>
			<main className='flex-1 flex-grow overflow-y-hidden p-5'>
				{children}
			</main>
		</div>
	)
}
