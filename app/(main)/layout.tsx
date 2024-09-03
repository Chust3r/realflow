import { Grid } from '~ui/grid'
import type { Metadata } from 'next'

interface Props {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return (
		<div className='w-full h-fit min-h-dvh grid place-items-center overflow-hidden relative'>
			{children}
			<Grid
				strokeDasharray={'4 2'}
				width={80}
				height={80}
				className='[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
			/>
			<span className='absolute inset-0 w-full h-5 rounded-full bg-primary opacity-30 blur-3xl -top-5'></span>
			<span className='absolute w-full h-5 rounded-full bg-primary opacity-20 blur-3xl -bottom-5'></span>
		</div>
	)
}

export default Layout

//→ metadata

export const metadata: Metadata = {
	title: {
		template: 'RealFlow | %s',
		default: 'RealFlow | A Open Source Project for real-time communication',
	},
}
