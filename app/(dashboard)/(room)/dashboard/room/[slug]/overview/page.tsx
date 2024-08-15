import { getRoomBySlug } from '~lib/rooms'

interface Props {
	params: {
		slug: string
	}
}

async function Page({ params }: Props) {
	const room = await getRoomBySlug(params.slug)

	return <div></div>
}

export default Page
