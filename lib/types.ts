import { InferSelectModel } from 'drizzle-orm'
import { schema } from '~drizzle/schema'

export type Room = InferSelectModel<typeof schema.rooms>

export type RoomWithMessages = Room & { messages: number }

export type RoomRequest = {
	date: string
	authorized: number
	unauthorized: number
}

export type RoomConnection = {
	date: string
	connections: number
}

export type RoomMessage = {
	date: string
	messages: number
}

export type RoomOrigin = {
	address: string
	total: number
	authorized: number
	unauthorized: number
}

export type ServerActionResponse = {
	status: 'success' | 'error'
	message?: string
}
