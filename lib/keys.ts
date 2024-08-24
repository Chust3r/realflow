import { ec } from 'elliptic'
const EC = new ec('p256')

const formatKey = (key: string, prefix: string) => {
	const cleankey = key
		.replace(/-----BEGIN (.*)-----/g, '')
		.replace(/-----END (.*)-----/g, '')
		.replace(/\s+/g, '')

	return `${prefix || ''}${cleankey}`
}

export const generateKeys = () => {
	const keys = EC.genKeyPair()

	const publicKey = formatKey(keys.getPublic('hex'), 'pk_')
	const secretKey = formatKey(keys.getPrivate('hex'), 'sk_')

	return {
		publicKey,
		secretKey,
	}
}

export const maskKey = (key: string, chars: number) => {
	const start = key.slice(0, chars)
	const end = key.slice(-chars)

	return `${start}...${end}`
}
