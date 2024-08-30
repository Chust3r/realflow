import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'

export const highlightCode = async (code: string) => {
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, {
			keepBackground: false,
			theme: 'one-dark-pro',
		})
		.use(rehypeStringify)
		.process(code)

	return String(file)
}

export const extractCodeBlock = (code: string) => {
	const regex = /```[a-z]*\n([\s\S]*?)```/g
	const matches = []

	let match
	while ((match = regex.exec(code)) !== null) {
		matches.push(match[1].trim())
	}

	return matches.join('\n\n')
}
