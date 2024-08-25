import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~ui/button'
import { copyToClipboard } from '~lib/copy-to-clipboard'

interface Props {
	data: string
	onCopy?: () => void
	delay?: number
}

export function CopyToClipboard({
	data,
	onCopy = () => {},
	delay = 1000,
}: Props) {
	const [isCopied, setIsCopied] = useState(false)

	const handleCopy = async () => {
		await copyToClipboard(data)

		setIsCopied(true)

        onCopy()

		setTimeout(() => {
			setIsCopied(false)
		}, delay)
	}

	return (
		<Button
			size='xs'
			variant='ghost'
			className='p-1.5 relative'
			onClick={handleCopy}
		>
			<Copy
				className='h-4 w-4 stroke-muted-foreground scale-100 data-[is-copied=true]:scale-0 transition-all duration-300'
				data-is-copied={isCopied}
			/>
			<Check
				className='h-4 w-4 stroke-muted-foreground scale-0 data-[is-copied=true]:scale-100 absolute transition-all duration-300'
				data-is-copied={isCopied}
			/>
		</Button>
	)
}
