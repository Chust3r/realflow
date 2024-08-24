'use client'
import { Switch } from '~ui/switch'
import { Button } from '~ui/button'
import { useState } from 'react'
import { useToast } from '~ui/use-toast'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~ui/table'
import { SecretKey } from '~lib/types'
import { maskKey } from '~lib/keys'
import { ShowForm } from './show-form'
import { formatDate } from 'date-fns'
import { switchEnableAuth, removeSecretKey } from '~actions/api-keys'
import { Copy, Trash } from 'lucide-react'

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

	const handleRemove = async (id: string) => {
		const res = await removeSecretKey(roomId, id)

		if (res.status === 'success') {
			toast({
				title: 'Secret Key removed',
				description: res.message || 'Your Secret Key has been removed',
			})
		} else {
			toast({
				title: 'Secret Key failed',
				description: res.message || 'Your room could not be removed',
			})
		}
	}

	return (
		<section className='w-full rounded-lg border bg-accent/10'>
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
					<div className='text-sm text-muted-foreground'>
						<span className='min-w-[100px] line-clamp-1'>
							{maskKey(pk, 20)}
						</span>
					</div>
					<Button variant='ghost' size='xs' className='p-1.5'>
						<Copy className='h-4 w-4 stroke-muted-foreground' />
					</Button>
				</div>
			</div>
			{enableAuth && (
				<div className='px-6 py-4 grid grid-cols-12 items-center gap-2'>
					<p className='text-sm font-medium text-muted-foreground col-span-4'>
						Secret Keys
					</p>
					<div className='col-span-8 flex justify-end items-center gap-2'>
						<ShowForm size='xs' roomId={roomId} disabled={sk.length >= 3}>
							New Secret Key
						</ShowForm>
					</div>
					<div className='col-span-12'>
						<Table aria-label='Secret Keys'>
							<TableHeader>
								<TableRow>
									<TableHead className='w-[150px]'>
										Expiration date
									</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Value</TableHead>
									<TableHead className='text-right'>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sk.map(({ expires, id, description, value }, i) => (
									<TableRow key={id}>
										<TableCell className='text-sm'>
											{expires
												? formatDate(
														new Date(expires),
														'MMM dd yyyy'
													)
												: 'Never'}
										</TableCell>
										<TableCell>
											{description ? description : 'No description'}
										</TableCell>
										<TableCell>
											<div className='col-span-8 flex  items-center gap-2'>
												<div className='text-sm text-muted-foreground'>
													<span>{maskKey(value, 15)}</span>
												</div>
												<Button
													variant='ghost'
													size='xs'
													className='p-1.5'
												>
													<Copy className='h-4 w-4 stroke-muted-foreground' />
												</Button>
											</div>
										</TableCell>
										<TableCell className='text-right'>
											{i !== 0 && (
												<div>
													<Button
														variant='ghost'
														size='xs'
														onClick={() => handleRemove(id)}
													>
														<Trash className='h-4 w-4 stroke-muted-foreground' />
													</Button>
												</div>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			)}
		</section>
	)
}
