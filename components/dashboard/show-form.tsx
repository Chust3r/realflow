'use client'
import { Button, ButtonProps } from '~ui/button'
import { setRoomStore } from '~stores/room'

interface Props extends ButtonProps {}

export function ShowForm(props: Props) {
	return (
		<Button onClick={() => setRoomStore({ open: true })} {...props}></Button>
	)
}
