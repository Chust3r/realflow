'use client'
import { SecretKey } from '~lib/types'
import { Switch } from '~ui/switch'
import { Button } from '~ui/button'
import { maskKey } from '~lib/keys'
import { Copy } from 'lucide-react'
import { ShowForm } from './show-form'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~ui/table'
import { formatDate } from 'date-fns'

interface Props {
	enableAuth: boolean
	pk: string
	sk: SecretKey[]
}

export function APIKeys({ enableAuth = false, pk, sk }: Props) {
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
						<Switch id='enableAuth' checked={enableAuth} />
					</div>
				</div>
			</div>
			<div className='px-6 py-4 grid grid-cols-12 items-center'>
				<span className='text-sm font-medium text-muted-foreground col-span-4'>
					Public Key
				</span>
				<div className='col-span-8 flex justify-end items-center gap-2'>
					<div className='text-sm text-muted-foreground'>
						<span>{maskKey(pk, 20)}</span>
					</div>
					<Button variant='ghost' size='xs' className='p-1.5'>
						<Copy className='h-4 w-4 stroke-muted-foreground' />
					</Button>
				</div>
			</div>
			<div className='px-6 py-4 grid grid-cols-12 items-center gap-2'>
				<span className='text-sm font-medium text-muted-foreground col-span-4'>
					Secret Keys
				</span>
				<div className='col-span-8 flex justify-end items-center gap-2'>
					<ShowForm size='xs'>New Secret Key</ShowForm>
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
							{sk.map(({ expires, id, description, value }) => (
								<TableRow key={id}>
									<TableCell>
										{expires
											? formatDate(new Date(expires), 'yyyy-MM-dd')
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
									<TableCell className='text-right'>$250.00</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	)
}
