const characters =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export const generateSlug = (length = 8) => {
	let slug = ''
	for (let i = 0; i < length; i++) {
		slug += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return slug
}
