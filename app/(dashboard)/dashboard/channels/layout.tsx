import { CreateChannel } from '~components/dashboard/form'

interface Props {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return (
		<>
			{children}
			<CreateChannel />
		</>
	)
}

export default Layout
