import { ThemeProvider } from '~components/theme/provider'
import { Toaster } from '~ui/toaster'

interface Props {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<ThemeProvider attribute='class' enableSystem defaultTheme='dark'>
			{children}
			<Toaster />
		</ThemeProvider>
	)
}

export default Layout
