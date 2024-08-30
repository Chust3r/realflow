import { CopyToClipboard } from '~ui/copy-to-clipboard'
import { Alert, AlertDescription } from '~ui/alert'
import { highlightCode, extractCodeBlock } from '~lib/highlight-code'
import { cn } from '~lib/utils'

interface Props {
	code: string
	className?: string
}

export async function CodeBlock({ code,className }: Props) {
	const highlightedCode = await highlightCode(code)
	const codeToCopy = extractCodeBlock(code)

	return (
		<Alert className={cn('bg-accent/10 relative', className)}>
			<CopyToClipboard
				data={codeToCopy}
				className='absolute top-0 right-0 m-1.5'
			/>
			<AlertDescription
				className='text-muted-foreground'
				dangerouslySetInnerHTML={{ __html: highlightedCode }}
			></AlertDescription>
		</Alert>
	)
}
