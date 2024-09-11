import { getRoomBySlug } from '~lib/rooms'
import { getASecretKeys } from '~lib/api-keys'
import { Alert, AlertDescription, AlertTitle } from '~ui/alert'
import { APIKeys } from '~dashboard/room/keys/keys'

interface Props {
	params: {
		slug: string
	}
}

async function Page({ params }: Props) {
	const room = await getRoomBySlug(params.slug)

	const sk = await getASecretKeys(room?.id!)

	return (
		<article className='h-fit p-4 space-y-8 max-w-4xl'>
			<Alert className='col-span-12 bg-accent/5'>
				<AlertTitle>API Keys</AlertTitle>
				<AlertDescription className='text-muted-foreground'>
					Manage the access credentials for your channel. Generate and view
					your Public Key for basic access, and Secret Keys for enhanced
					security when needed.
				</AlertDescription>
			</Alert>
			<APIKeys
				roomId={room?.id!}
				pk={room?.publicKey!}
				sk={sk}
			/>
		</article>
	)
}

export default Page
