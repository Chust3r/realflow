'use client'
import { Button, ButtonProps } from '~ui/button'
import { setSecretStore } from '~stores/secret'

interface Props extends ButtonProps {
	roomId: string
}

export function ShowForm(props: Props) {
	const { roomId, ...rest } = props

	return (
		<Button
			onClick={() => setSecretStore({ open: true, roomId: props.roomId })}
			{...rest}
		/>
	)
}
