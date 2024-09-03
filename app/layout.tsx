import { ThemeProvider } from '~components/theme/provider'
import { Toaster } from '~ui/sonner'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

interface Props {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={GeistSans.className}>
				<ThemeProvider attribute='class' enableSystem defaultTheme='dark'>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}

export default Layout