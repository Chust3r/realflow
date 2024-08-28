'use client'
import { useState, useEffect, useContext, createContext } from 'react'
import { io, type Socket } from 'socket.io-client'
import { resetEventStore, setPushEvent } from '~stores/events'

interface SocketContext {
	socket?: Socket
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
	const [socket, setSocket] = useState<Socket>()
	const [isConnected, setIsConnected] = useState(false)
	const [currentConnections, setCurrentConnections] = useState(0)

	useEffect(() => {
		const s = io(process.env.NEXT_PUBLIC_WS_URL!, {
			path: '/api/ws',
			transports: ['websocket'],
			reconnectionAttempts: 5,
			reconnectionDelay: 3000,
			timeout: 10000,
			auth,
		})

		s.on('connect', () => {
			setIsConnected(true)
			setSocket(s)
		})

		s.on('connections', (data) => {
			setCurrentConnections(data.data)
		})

		s.on('disconnect', (reason) => {
			setIsConnected(false)
		})

		s.on('connect_error', (error) => {
			console.error('Connection error:', error)
		})

		s.onAny((event, data) => {
			setPushEvent({
				date: (data['date'] as string) ?? '',
				event,
				payload:
					typeof data['data'] === 'string'
						? data['data']
						: JSON.stringify(data['data']),
			})
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
