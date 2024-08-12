import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const globalPrisma = globalThis as unknown as {
	prisma: PrismaClient
}

export const prisma =
	globalPrisma?.prisma || new PrismaClient({ adapter, log: ['info'] })

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma
