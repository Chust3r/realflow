import {
	pgTable,
	text,
	timestamp,
	integer,
	boolean,
	uniqueIndex,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { users } from './auth'

export const messages = pgTable('message', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey()
		.notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	content: text('content').notNull(),
	roomId: text('roomId')
		.notNull()
		.references(() => rooms.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const requests = pgTable('request', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey()
		.notNull(),
	origin: text('origin').notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	address: text('address').notNull(),
	authorized: boolean('authorized').notNull(),
	roomId: text('roomId')
		.notNull()
		.references(() => rooms.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	userAgent: text('userAgent').notNull(),
})

export const metrics = pgTable('metric', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey()
		.notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	roomId: text('roomId')
		.notNull()
		.references(() => rooms.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	event: text('event').notNull(),
	payload: text('payload'),
})

export const rooms = pgTable(
	'room',
	{
		id: text('id')
			.$defaultFn(() => crypto.randomUUID())
			.primaryKey()
			.notNull(),
		name: text('name').notNull(),
		description: text('description'),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', {
			precision: 3,
			mode: 'string',
		})
			.$onUpdate(() => sql`now()`)
			.notNull(),
		userId: text('userId')
			.notNull()
			.references(() => users.id, {
				onDelete: 'restrict',
				onUpdate: 'cascade',
			}),
		messagePersistence: boolean('messagePersistence').default(false).notNull(),
		webhook: boolean('webhook').default(false).notNull(),
		webhookUrl: text('webhookUrl'),
		maxConnections: integer('maxConnections')
			.default(20)
			.notNull(),
		publicKey: text('publicKey').notNull(),
		slug: text('slug').notNull(),
		connections: integer('connections').default(0).notNull(),
	},
	(table) => {
		return {
			idSlugKey: uniqueIndex('rooms_id_slug_key').using(
				'btree',
				table.id,
				table.slug
			),
		}
	}
)

export const secretkeys = pgTable('secretkeys', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey()
		.notNull(),
	value: text('value').notNull(),
	expires: timestamp('expires', { precision: 3, mode: 'string' }),
	description: text('description').notNull(),
	ipAddress: text('ipAddress').default('').notNull(),
	roomId: text('roomId')
		.notNull()
		.references(() => rooms.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', {
		precision: 3,
		mode: 'string',
	})
		.$onUpdate(() => sql`now()`)
		.notNull(),
})
