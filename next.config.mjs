/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/dashboard',
				destination: '/dashboard/rooms',
				permanent: false,
			},
			{
				source: '/dashboard/room/:slug',
				destination: '/dashboard/room/:slug/overview',
				permanent: false,
			},
		]
	},
	reactStrictMode: false,
}

export default nextConfig
