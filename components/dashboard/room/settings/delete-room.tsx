"use client"
import {} from '~ui/dialog'
import { Button } from '~ui/button'

interface Props {
	roomId: string
}

export function DeleteRoom({ roomId }: Props) {
	return (
		<Button
			variant='destructive'
			size='xs'
			className='max-w-[200px] place-self-end'
		>
			Delete Room
		</Button>
	)
}
