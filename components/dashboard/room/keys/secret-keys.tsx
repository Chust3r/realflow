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
import { CopyToClipboard } from '~ui/copy-to-clipboard'
import { DeleteKey } from './delete-key'
import { formatDate } from 'date-fns'

interface Props {
	secretKeys: SecretKey[]
}

export function SecretKeys({ secretKeys }: Props) {
	return (
		<Table aria-label='Secret Keys'>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[150px]'>Expiration date</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Value</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{secretKeys.map(({ expires, id, description, value }, i) => (
					<TableRow key={id}>
						<TableCell className='text-sm'>
							{expires
								? formatDate(new Date(expires), 'MMM dd yyyy')
								: 'Never'}
						</TableCell>
						<TableCell>
							{description ? description : 'No description'}
						</TableCell>
						<TableCell>
							<div className='text-sm text-muted-foreground'>
								<span>{maskKey(value, 15)}</span>
							</div>
						</TableCell>
						<TableCell>
							<div className='flex item-center gap-2 justify-end'>
								<CopyToClipboard data={value} />
								{i !== 0 && <DeleteKey id={id} />}
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
