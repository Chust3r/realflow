/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/dashboard',
				destination: '/dashboard/channels',
				permanent: true,
			},
		]
	},
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
		},
	},
}

export default nextConfig
