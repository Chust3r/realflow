'use client'
import { Button, ButtonProps } from '~ui/button'
import { setSecretStore } from '~stores/secret'

interface Props extends ButtonProps {}

export function ShowForm(props: Props) {
	return (
		<Button
			onClick={() => setSecretStore({ open: true })}
			{...props}
		></Button>
	)
}
