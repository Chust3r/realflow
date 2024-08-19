import { InferSelectModel } from 'drizzle-orm'
import { schema } from '~drizzle/schema'

export type Room = InferSelectModel<typeof schema.rooms>
