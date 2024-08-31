interface Props {
	children: React.ReactNode
	top?: React.ReactNode
}

export function Content({ children, top }: Props) {
	return (
		<div className='flex flex-1 flex-col'>
			{top}
			<main className='flex-grow overflow-y-auto p-5'>{children}</main>
		</div>
	)
}
