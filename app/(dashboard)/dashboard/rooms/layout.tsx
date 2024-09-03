import { CreateRoom } from '~components/dashboard/form'
import { type Metadata } from 'next'

interface Props {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return (
		<>
			{children}
			<CreateRoom />
		</>
	)
}

export default Layout

export const metadata: Metadata = {
	title: 'Dashboard',
}
