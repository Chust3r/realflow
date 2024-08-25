export const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch (e) {
		return false
	}
}
