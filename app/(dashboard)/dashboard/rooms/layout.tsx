import { CreateRoom } from '~components/dashboard/form'

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
