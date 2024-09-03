import { DashboardLayout } from '~layouts/dashboard'
import { type Metadata } from 'next'

interface Props {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout

//→ metadata

export const metadata: Metadata = {
	title: {
		template: '%s | RealFlow',
		default: 'Dashboard | RealFlow',
	},
}
