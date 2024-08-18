import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	dialect: 'postgresql',
	schema: './drizzle/schema/*.ts',
	out: './drizzle/migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
})
