import { CreateSecretKeys } from '~dashboard/room/keys/form'

interface Props {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return (
		<>
			{children}
			<CreateSecretKeys />
		</>
	)
}

export default Layout
