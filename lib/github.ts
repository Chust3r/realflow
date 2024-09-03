const BASE_URL = 'https://api.github.com'

export const getStars = async () => {
	const res = await fetch(`${BASE_URL}/repos/Chust3r/realflow`,{
		next:{
			revalidate: 60 * 60 * 24
		}
	})

	const data = await res.json()

	return data.stargazers_count || 0
}
