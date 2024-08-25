'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '~ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '~ui/avatar'
import { useTheme } from 'next-themes'
import { logOut } from '~actions/auth'
import Link from 'next/link'

interface Props {
	user: {
		name?: string
		email?: string
		image?: string
	}
}

export function Profile({ user }: Props) {
	const { setTheme, theme } = useTheme()

	const handleLogOut = async () => {
		await logOut()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='w-full'>
				<div
					className='flex items-center gap-2 hover:bg-secondary/30 w-full px-2 py-1 rounded-lg'
					role='combobox'
				>
					<Avatar className='w-8 h-8'>
						<AvatarImage src={user?.image!} />
						<AvatarFallback>A</AvatarFallback>
					</Avatar>
					<div className='flex flex-col items-start'>
						<p className='text-sm font-medium truncate'>{user?.name!}</p>
						<span className='text-xs text-muted-foreground truncate max-w-[200px]'>
							{user?.email!}
						</span>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>
					<div className='flex flex-col items-start'>
						<p className='text-sm font-medium truncate'>{user?.name!}</p>
						<span className='text-xs text-muted-foreground truncate max-w-[200px]'>
							{user?.email!}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link href='/dashboard/account/me'>
					<DropdownMenuItem>
						<span className='text-xs text-muted-foreground'>Account</span>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
					<span className='text-xs text-muted-foreground p-2'>Theme</span>

					<DropdownMenuRadioItem
						value='system'
						className='text-muted-foreground text-xs'
					>
						System
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						value='light'
						className='text-muted-foreground text-xs'
					>
						Light
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						value='dark'
						className='text-muted-foreground text-xs'
					>
						Dark
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogOut}>
					<span className='text-xs text-muted-foreground' role='button'>
						Log out
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
