import { Avatar, AvatarFallback, AvatarImage } from '~ui/avatar'
import { auth } from '~auth'

export async function Profile() {
	const user = await auth()

	return <></>
}

/* <div className='flex items-center gap-2'>
			<Avatar className='w-7 h-7'>
				<AvatarImage src={user?.image!} />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div className='flex gap-2 items-center justify-between w-full'>
				<span className='text-xs text-muted-foreground truncate flex-1 max-w-36'>
					{user.email}
				</span>
			</div>
		</div> */
