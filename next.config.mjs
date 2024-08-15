	/** @type {import('next').NextConfig} */
	const nextConfig = {
		async redirects() {
			return [
				{
					source: '/dashboard/channels',
					destination: '/dashboard/rooms',
					permanent: false,
				},
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
