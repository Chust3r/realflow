import { relations } from 'drizzle-orm/relations'
import {
	accounts,
	authenticators,
	sessions,
	users,
	verificationTokens,
} from './auth'
import {
	blacklist,
	metrics,
	messages,
	requests,
	rooms,
	secretkeys,
} from './tables'

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}))

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	sessions: many(sessions),
	rooms: many(rooms),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}))

export const messagesRelations = relations(messages, ({ one }) => ({
	room: one(rooms, {
		fields: [messages.roomId],
		references: [rooms.id],
	}),
}))

export const roomsRelations = relations(rooms, ({ one, many }) => ({
	messages: many(messages),
	requests: many(requests),
	blacklists: many(blacklist),
	metrics: many(metrics),
	user: one(users, {
		fields: [rooms.userId],
		references: [users.id],
	}),
	secretkeys: many(secretkeys),
}))

export const requestsRelations = relations(requests, ({ one }) => ({
	room: one(rooms, {
		fields: [requests.roomId],
		references: [rooms.id],
	}),
}))

export const blacklistRelations = relations(blacklist, ({ one }) => ({
	room: one(rooms, {
		fields: [blacklist.roomId],
		references: [rooms.id],
	}),
}))

export const metricsRelations = relations(metrics, ({ one }) => ({
	room: one(rooms, {
		fields: [metrics.roomId],
		references: [rooms.id],
	}),
}))

export const secretkeysRelations = relations(secretkeys, ({ one }) => ({
	room: one(rooms, {
		fields: [secretkeys.roomId],
		references: [rooms.id],
	}),
}))
