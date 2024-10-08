import { General } from '~components/account/general'
import { DangerZone } from '~components/account/danger-zone'
import { Metadata } from 'next'

function Page() {
	return (
		<article className='max-w-4xl h-fit p-4 space-y-8'>
			<General />
			<DangerZone />
		</article>
	)
}

export default Page

//→ metadata

export const metadata: Metadata = {
	title: 'Account',
}
