import { Indicator } from '~dashboard/indicator'

interface Props {
	children: React.ReactNode
}

export function Content({ children }: Props) {
	return (
		<div className='flex flex-1 flex-col'>
			<div className='h-12 min-h-12 border-b'>
				<div className='w-full h-full flex items-center justify-between px-6'>
					<Indicator />
				</div>
			</div>
			<main className='flex-grow overflow-y-auto p-5'>
				{children}
			</main>
		</div>
	)
}
