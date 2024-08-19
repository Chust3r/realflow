import { InferSelectModel } from 'drizzle-orm'
import { schema } from '~drizzle/schema'

export type Room = InferSelectModel<typeof schema.rooms>

export type ServerActionResponse = {
	status: 'success' | 'error'
	message?: string
}
