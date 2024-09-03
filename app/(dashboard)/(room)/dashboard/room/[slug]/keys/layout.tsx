import { CreateSecretKeys } from '~dashboard/room/keys/form'
import { Metadata } from 'next'

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

//→ metadata

export const metadata: Metadata = {
	title: 'API Keys',
}

