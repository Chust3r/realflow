import { db } from '~db'
import { sql } from 'drizzle-orm'
import { RoomRequest, RoomConnection, RoomMessage } from '~types'

export const getRequests = async (roomId: string) => {
	const query = sql`
    SELECT
        TO_CHAR("rq"."createdAt", 'YYYY-MM-DD') date,
        SUM(
            CASE
            WHEN "authorized" = TRUE THEN 1
            ELSE 0
            END
        ) authorized,
        SUM(
            CASE
            WHEN "authorized" = FALSE THEN 1
            ELSE 0
            END
        ) unauthorized
    FROM
        request rq
    INNER JOIN room r ON "r"."id" = "rq"."roomId"
    WHERE
        "r"."id" = ${roomId}
    GROUP BY
        TO_CHAR("rq"."createdAt", 'YYYY-MM-DD'),
        NAME,
        "r"."id"
    `

	const requests = await db.execute<RoomRequest>(query)

	return requests.rows
}

export const getConnections = async (roomId: string) => {
	const query = sql`
    SELECT
        TO_CHAR("m"."createdAt", 'YYYY-MM-DD') date,
        MAX("connections") connections
    FROM
        metric m
    WHERE
        "m"."roomId" = ${roomId}
    GROUP BY
        TO_CHAR("m"."createdAt", 'YYYY-MM-DD')
    `

	const connections = await db.execute<RoomConnection>(query)

	return connections.rows
}

export const getMessages = async (roomId: string) => {
	const query = sql`
    SELECT
        TO_CHAR("m"."createdAt", 'YYYY-MM-DD') date,
        COUNT("m"."id") messages
    FROM
        metric m
    INNER JOIN room r ON "m"."roomId" = "r"."id"
    WHERE
        "r"."id" = ${roomId}
    GROUP BY
        TO_CHAR("m"."createdAt", 'YYYY-MM-DD');
    `

	const messages = await db.execute<RoomMessage>(query)

	return messages.rows
}
