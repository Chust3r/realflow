'use client'
import { useState, useEffect, useContext, createContext, useRef } from 'react'
import { Client } from 'realflow-client'
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
	const [connections, setConnections] = useState(0)
	const socketRef = useRef<Client>()

	useEffect(() => {
		if (!socketRef.current) {
			const s = new Client(process.env.NEXT_PUBLIC_WS_URL!, auth)
			socketRef.current = s

			s.on('connect', () => {
				s.on('*', (data) =>
					setPushEvent({
						event: data.event,
						timestamp: data.timestamp,
						payload: data.payload,
					})
				)
			})

			s.on('connection', ({ payload }) => {
				setConnections(payload!.connections ?? 0)
			})

			s.on("disconnection",({payload})=>{
				setConnections(payload!.connections ?? 0)
			})

			s.on('disconnect', () => {
				console.log('disconnected')
				setIsConnected(false)
			})

			setSocket(s)
		}

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect()
				resetEventStore()
			}
		}
	}, [])

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
