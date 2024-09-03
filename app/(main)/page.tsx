import { Header } from '~components/landing/header'
import { Content } from '~components/landing/content'
import { Footer } from '~components/landing/footer'

function Page() {
	return (
		<section className='w-full h-full flex flex-col'>
			<Header />
			<Content />
			<Footer/>
		</section>
	)
}

export default Page
