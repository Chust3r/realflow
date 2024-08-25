import { db } from '~db'
import { sql } from 'drizzle-orm'
import { RoomRequest, RoomConnection, RoomMessage, RoomOrigin } from '~types'

export const getRequests = async (roomId: string) => {
	const query = sql`
    SELECT
        MIN("rq"."createdAt") date,
        CAST(SUM(
            CASE
            WHEN "authorized" = TRUE THEN 1
            ELSE 0
            END
        ) AS INTEGER) authorized,
        CAST(SUM(
            CASE
            WHEN "authorized" = FALSE THEN 1
            ELSE 0
            END
        ) AS INTEGER) unauthorized
    FROM
        request rq
    INNER JOIN room r ON "r"."id" = "rq"."roomId"
    WHERE
        "r"."id" = ${roomId}
    GROUP BY
        TO_CHAR("rq"."createdAt", 'YYYY-MM-DD'),
        "r"."id"
    ORDER BY
        date
    `

	const queryTotal = sql`
    SELECT 
        CAST(COUNT("rq"."id") AS INTEGER) total 
    FROM 
        request rq
    INNER JOIN room r ON "rq"."roomId" = "r"."id"
    WHERE 
        "r"."id" = ${roomId}
    `

	const requests = await db.execute<RoomRequest>(query)

	const total = await db.execute<{ total: number }>(queryTotal)

	return {
		requests: requests.rows,
		total: total.rows[0].total ?? 0,
	}
}

export const getConnections = async (roomId: string) => {
	const query = sql`
    SELECT
        MIN("m"."createdAt") date,
        MAX("connections") connections
    FROM
        metric m
    WHERE
        "m"."roomId" = ${roomId}
        AND "m"."event" = 'connection'
    GROUP BY
        TO_CHAR("m"."createdAt", 'YYYY-MM-DD')
    ORDER BY date
    `

	const connections = await db.execute<RoomConnection>(query)

	return connections.rows
}

export const getMessages = async (roomId: string) => {
	const query = sql`
    SELECT
        MIN("m"."createdAt") date,
        COUNT("m"."id") messages
    FROM
        metric m
    INNER JOIN room r ON "m"."roomId" = "r"."id"
    WHERE
        "r"."id" = ${roomId}
        AND "m"."event" != 'connection'
    GROUP BY
        TO_CHAR("m"."createdAt", 'YYYY-MM-DD')
    ORDER BY date;
    `

	const queryTotal = sql`
    SELECT
        CAST(COUNT("m"."id") AS INTEGER) total
    FROM
        metric m
    INNER JOIN room r ON "m"."roomId" = "r"."id"
    WHERE
        "r"."id" = ${roomId}
        AND "m"."event" != 'connection'
    `

	const messages = await db.execute<RoomMessage>(query)

	const total = await db.execute<{ total: number }>(queryTotal)

	return {
		messages: messages.rows,
		total: total.rows[0].total ?? 0,
	}
}

export const getOrigins = async (roomId: string) => {
	const query = sql`
    SELECT
        "rq"."address",
    CAST(COUNT("rq"."id") AS INTEGER) total,
    CAST(SUM(
        CASE
        WHEN authorized = TRUE THEN 1
        ELSE 0
        END
    )AS INTEGER) authorized,
    CAST(SUM(
        CASE
        WHEN authorized = FALSE THEN 1
        ELSE 0
        END
    ) AS INTEGER) unauthorized
    FROM
    request rq
    LEFT JOIN room r ON "rq"."roomId" = "r"."id"
    WHERE
    "roomId" = ${roomId}
    GROUP BY
        "rq"."address"
    ORDER BY authorized DESC
    `

	const origins = await db.execute<RoomOrigin>(query)

	return origins.rows
}
