'use client'
import { Button, ButtonProps } from '~ui/button'
import { setChannelStore } from '~stores/channel'

interface Props extends ButtonProps {}

export function ShowForm(props: Props) {
	return (
		<Button
			onClick={() => setChannelStore({ open: true })}
			{...props}
		></Button>
	)
}
