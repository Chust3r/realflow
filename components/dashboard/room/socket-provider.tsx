'use client'
import { useState, useEffect, useContext, createContext, useRef } from 'react'
import { WebSocketClient } from '@chust3r/websocket-client'
import { resetEventStore, setPushEvent } from '~stores/events'

interface SocketContext {
	socket?: WebSocketClient
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
	const [socket, setSocket] = useState<WebSocketClient>()
	const [isConnected, setIsConnected] = useState(false)
	const [connections, setConnections] = useState(0)
	const socketRef = useRef<WebSocketClient>()

	useEffect(() => {
		if (!socketRef.current) {
			const s = new WebSocketClient(process.env.NEXT_PUBLIC_WS_URL!, {
				query: auth,
				useCompression: true,
			})
			socketRef.current = s

			s.on('connect', () => {
				setIsConnected(true)
				s.onAny(({ event, timestamp, data }) =>
					setPushEvent({
						event,
						timestamp,
						data,
					})
				)
			})

			s.on('connection', ({ data }) => {
				setConnections(data!.connections ?? 0)
			})

			s.on('disconnection', ({ data }) => {
				setConnections(data!.connections ?? 0)
			})

			s.on('disconnect', () => {
				setIsConnected(false)
			})

			setSocket(s)
		}

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect()
				resetEventStore()
				socketRef.current = undefined
			}
		}
	}, [auth])

	return (
		<SocketContext.Provider
			value={{
				socket,
				isConnected,
				currentConnections: connections,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}

export const useSocket = () => useContext(SocketContext)
