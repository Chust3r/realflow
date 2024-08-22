import {
	Zap,
	Router,
	Webhook,
	KeyRound,
	Settings,
	Server,
	ShieldCheck,
	AppWindowMac,
	Ticket,
	UserRound,
	House,
} from 'lucide-react'

export const items = [
	{
		title: 'Rooms',
		path: '/dashboard/rooms',
		icon: Server,
	},
	{
		title: 'Account',
		path: '/dashboard/account/me',
		icon: UserRound,
	},
	{
		title: 'Preferences',
		path: '/dashboard/account/preferences',
		icon: AppWindowMac,
	},

	{
		title: 'Access tokens',
		path: '/dashboard/account/tokens',
		icon: Ticket,
	},
	{
		title: 'Security',
		path: '/dashboard/account/security',
		icon: ShieldCheck,
	},
]

const roomItems = [
	{
		title: 'Overview',
		path: 'overview',
		icon: House,
	},
	{
		title: 'Quickstart',
		path: 'quickstart',
		icon: Zap,
	},
	{
		title: 'Events',
		path: 'events',
		icon: Router,
	},
	{
		title: 'Webhooks',
		path: 'webhooks',
		icon: Webhook,
	},
	{
		title: 'API keys',
		path: 'keys',
		icon: KeyRound,
	},
	{
		title: 'Settings',
		path: 'settings',
		icon: Settings,
	},
]

const generateRoomItems = (slug: string) => {
	const items = roomItems.map((item) => ({
		...item,
		path: `/dashboard/room/${slug}/${item.path}`,
	}))

	return items
}

export const getItems = (type: 'dashboard' | 'rooms', slug = '') => {
	if (type === 'dashboard') {
		return items
	}

	return generateRoomItems(slug)
}

export type Items = ReturnType<typeof getItems>
