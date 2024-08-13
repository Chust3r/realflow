'use client'
import { logOut } from '~actions/auth'
import { LogOut as Lg } from 'lucide-react'

export function LogOut() {
	return (
		<div
			className='flex gap-2 items-center group'
			onClick={() => logOut()}
			role='button'
		>
			<Lg className='w-4 h-4 stroke-muted-foreground group-hover:stroke-foreground/70' />
			<span className='text-sm text-muted-foreground font-medium group-hover:text-foreground/70'>
				Sign out
			</span>
		</div>
	)
}
