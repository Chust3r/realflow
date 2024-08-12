import { DashboardLayout } from '~layouts/dashboard'

interface Props {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout
