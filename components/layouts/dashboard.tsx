import { Sidebar } from '~dashboard/sidebar'
import { Content } from '~dashboard/content'
import {Indicator} from "~dashboard/indicator"

interface Props {
	children: React.ReactNode
}


function Header (){
	return <div className='h-12 min-h-12 border-b'>
	<div className='w-full h-full flex items-center justify-between px-6'>
		<Indicator />
	</div>
</div>
}

export function DashboardLayout({ children }: Props) {
	return (
		<div className='w-full h-dvh min-h-fit overflow-hidden'>
			<div className='h-full flex relative'>
			<span className='absolute w-full inset-0 h-10 -z-10 rounded-full blur-3xl bg-primary/20 -top-14 '></span>
			
				<Sidebar slug='' type='dashboard' />
				<Content top={<Header/>} >{children}</Content>
			</div>
		</div>
	)
}
