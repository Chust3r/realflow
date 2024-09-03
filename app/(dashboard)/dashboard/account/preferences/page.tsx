import React from 'react'
import { NewsLetter } from '~/components/account/newsletter'
import { Theme } from '~components/account/theme'
import { type Metadata } from 'next'

function Page() {
	return (
		<article className='max-w-4xl h-fit p-4 space-y-8'>
			<Theme />
			<NewsLetter />
		</article>
	)
}

export default Page

//→ metadata

export const metadata: Metadata = {
	title: 'Preferences',
}
