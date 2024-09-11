'use client'
import { useState, useEffect, useContext, createContext } from 'react'
import { Client } from '~lib/realflow'
import { resetEventStore, setPushEvent } from '~stores/events'

interface SocketContext {
	socket?: Client
	isConnected: boolean
	currentConnections: number
}

const SocketContext = createContext<SocketContext>({
	isConnected: false,
	currentConnections: 0,
})

interface Props {
	children: React.ReactNode
	auth: {
		publicKey: string
		secretKey: string
	}
}

export function SocketProvider({ children, auth }: Props) {
	const [socket, setSocket] = useState<Client>()
	const [isConnected, setIsConnected] = useState(false)
	const [currentConnections, setCurrentConnections] = useState(0)

	useEffect(() => {
		const s = new Client(process.env.NEXT_PUBLIC_WS_URL!, auth)

		s.on('connect', () => {
			setIsConnected(true)
			setSocket(s)
		})

		s.on('connection', ({ payload }) => {
			setCurrentConnections(payload!.connections ?? 0)
		})

		s.on('disconnect', (reason) => {
			setIsConnected(false)
		})

		s.on('*', ({ event, timestamp, payload }) => {
			setPushEvent({ timestamp, event, payload: payload ?? {} })
		})

		return () => {
			s.disconnect()
			resetEventStore()
		}
	}, [])

	return (
		<SocketContext.Provider
			value={{
				socket,
				isConnected,
				currentConnections,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}

export const useSocket = () => useContext(SocketContext)
