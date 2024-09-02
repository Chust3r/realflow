'use client'
import { Switch } from '~ui/switch'
import { SecretKey } from '~lib/types'
import { maskKey } from '~lib/keys'
import { switchEnableAuth } from '~actions/api-keys'
import { CopyToClipboard } from '~ui/copy-to-clipboard'
import { useToast } from '~ui/use-toast'
import { SecretKeys } from './secret-keys'
import { ShowForm } from './show-form'
import { useState } from 'react'

interface Props {
	roomId: string
	enableAuth: boolean
	pk: string
	sk: SecretKey[]
}

export function APIKeys({ roomId, enableAuth = false, pk, sk }: Props) {
	const [disabled, setDisabled] = useState(false)

	const { toast } = useToast()

	const handleSwitch = async (value: boolean) => {
		setDisabled(true)
		await switchEnableAuth(roomId, value)
		setDisabled(false)
	}

	return (
		<section className='w-full rounded-lg border bg-accent/10 relative overflow-hidden'>
			<span className='absolute  w-10 h-10 bg-accent rounded-full blur-2xl right-0'></span>
			<div className='px-6 py-4 border-b flex items-center'>
				<div className='w-full flex justify-between items-center'>
					<h3 className='text-base font-medium tracking-wide text-foreground'>
						API Keys
					</h3>
					<div className='flex items-center gap-3'>
						<label
							htmlFor='enableAuth'
							className='text-xs font-medium text-muted-foreground'
						>
							{enableAuth ? 'Auth Enabled' : 'Auth Disabled'}
						</label>
						<Switch
							id='enableAuth'
							disabled={disabled}
							checked={enableAuth}
							onCheckedChange={handleSwitch}
						/>
					</div>
				</div>
			</div>
			<div className='px-6 py-4 grid grid-cols-12 items-center'>
				<span className='text-sm font-medium text-muted-foreground col-span-4'>
					Public Key
				</span>
				<div className='col-span-8 flex justify-end items-center gap-2'>
					<div className='text-sm text-muted-foreground min-w-[100px] truncate'>
						<span>{maskKey(pk, 15)}</span>
					</div>
					<CopyToClipboard data={pk} />
				</div>
			</div>
			{enableAuth && (
				<div className='border-t'>
					<div className='px-6 py-4'>
						<div className='flex justify-between items-center gap-2'>
							<p className='text-base font-medium tracking-wide text-foreground'>
								Secret Keys
							</p>

							<ShowForm
								size='xs'
								roomId={roomId}
								disabled={sk.length >= 3}
							>
								New Secret Key
							</ShowForm>
						</div>
					</div>
					<SecretKeys secretKeys={sk} />
				</div>
			)}
		</section>
	)
}
