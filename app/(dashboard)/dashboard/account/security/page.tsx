import { TwoFactorAuth } from '~components/account/two-factor-auth'
import { type Metadata } from 'next'

function Page() {
	return (
		<article className='max-w-4xl h-fit p-4 space-y-8'>
			<TwoFactorAuth />
		</article>
	)
}

export default Page

//→ metadata

export const metadata: Metadata = {
	title: 'Security',
}
