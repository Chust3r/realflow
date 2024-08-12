import React from 'react'
import { General } from '~/components/account/general'
import { Theme } from '~components/account/theme'

function Page() {
	return (
		<article className='max-w-4xl p-4 h-full space-y-8'>
			<General />
			<Theme/>
		</article>
	)
}

export default Page
