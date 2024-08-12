interface Props {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<div className='w-full h-fit min-h-dvh grid place-items-center'>
			{children}
		</div>
	)
}

export default Layout
