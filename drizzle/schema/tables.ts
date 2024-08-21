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
	updatedAt: timestamp('updatedAt', {
		precision: 3,
		mode: 'string',
	})
		.$onUpdate(() => sql`now()`)
		.notNull(),
	content: text('content').notNull(),
	size: integer('size').default(0).notNull(),
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
	updatedAt: timestamp('updatedAt', {
		precision: 3,
		mode: 'string',
	})
		.$onUpdate(() => sql`now()`)
		.notNull(),
	address: text('address').notNull(),
	authorized: boolean('authorized').notNull(),
	roomId: text('roomId')
		.notNull()
		.references(() => rooms.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	userAgent: text('userAgent').notNull(),
	metadata: text('metadata').notNull(),
})

export const blacklist = pgTable(
	'blacklist',
	{
		id: text('id')
			.$defaultFn(() => crypto.randomUUID())
			.primaryKey()
			.notNull(),
		host: text('host').notNull(),
		createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updatedAt', {
			precision: 3,
			mode: 'string',
		})
			.$onUpdate(() => sql`now()`)
			.notNull(),
		roomId: text('roomId')
			.notNull()
			.references(() => rooms.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => {
		return {
			hostRoomIdKey: uniqueIndex('blacklist_host_roomId_key').using(
				'btree',
				table.host,
				table.roomId
			),
		}
	}
)

export const metrics = pgTable('metric', {
	id: text('id')
		.$defaultFn(() => crypto.randomUUID())
		.primaryKey()
		.notNull(),
	createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', {
		precision: 3,
		mode: 'string',
	})
		.$onUpdate(() => sql`now()`)
		.notNull(),
	roomId: text('roomId')
		.notNull()
		.references(() => rooms.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	event: text('event').notNull(),
	connections: integer('connections').default(0).notNull(),
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
		saveMessages: boolean('saveMessages').default(false).notNull(),
		enableAuth: boolean('enableAuth').default(false).notNull(),
		enableWebHooks: boolean('enableWebHooks').default(false).notNull(),
		webhookUrl: text('webhookUrl'),
		maxSimultaneousConnections: integer('maxSimultaneousConnections')
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
