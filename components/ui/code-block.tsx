import { CopyToClipboard } from '~ui/copy-to-clipboard'
import { Alert, AlertDescription,} from '~ui/alert'
import { highlightCode, extractCodeBlock } from '~lib/highlight-code'

interface Props {
	code: string
}

export async function CodeBlock({ code }: Props) {
	const highlightedCode = await highlightCode(code)
	const codeToCopy = extractCodeBlock(code)

	return (
		<Alert className='col-span-12 bg-accent/10 relative'>
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
