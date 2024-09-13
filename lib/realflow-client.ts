import { inflate, deflate } from 'pako'

export interface ICompressor {
	encode: (data: string) => Uint8Array
	decode: (data: Uint8Array) => string
}

export class PakoCompressor implements ICompressor {
	public encode(data: string): Uint8Array {
		return deflate(data)
	}

	public decode(data: Uint8Array): string {
		return inflate(data, {
			to: 'string',
		})
	}
}

/**
 * Interface for authentication credentials.
 */
interface IAuth {
	publicKey: string
	secretKey: string
}

interface IOptions {
	reconnect: boolean
	reconnectionMaxAttempts: number
	reconnectionInterval: number
}

/**
 * Event map for the WebSocket client.
 */
interface EventMap {
	connect: (data: Event) => void
	disconnect: (data: CloseEvent) => void
	error: (data: Error) => void
	reconnect_attempt: (data: number) => void
	reconnect_failed: (data: number) => void
}

/**
 * Structure of the message sent through the WebSocket.
 */
interface IMessage {
	timestamp: string // Timestamp of the message
	event: string // Name of the event
	payload?: Record<string, any> // Additional data of the message
}

/**
 * Enum for the connection status.
 */
enum ConnectionStatus {
	CONNECTED = 'connected',
	DISCONNECTED = 'disconnected',
	RECONNECTING = 'reconnecting',
}

/**
 * Class to handle the WebSocket client.
 */
export class Client {
	private ws!: WebSocket // Instance of the WebSocket
	private auth!: IAuth // Authentication credentials
	private url: string // URL of the WebSocket server
	private compressor!: ICompressor // Message compressor
	private isAuthenticated = false // Authentication status
	private isConnected = false // Connection status
	private status: ConnectionStatus = ConnectionStatus.DISCONNECTED // Current connection status
	private reconnectAttempts = 0 // Number of reconnection attempts
	private options!: IOptions
	private eventQueue: IMessage[] = [] // Queue of pending events
	private eventListeners: {
		[key: string]: Function[]
	} = {} // Map of event listeners
	private isIntentionalDisconnect = false // New: Flag for intentional disconnect

	/**
	 * Creates an instance of the WebSocket client.
	 * @param url - The URL of the WebSocket server.
	 * @param auth - The authentication credentials.
	 */
	constructor(url: string, auth: IAuth) {
		this.url = url

		//→ SET AUTH
		this.auth = auth

		//→ SET OPTIONS
		this.options = {
			reconnect: false,
			reconnectionInterval: 1500,
			reconnectionMaxAttempts: 5,
		}

		//→ SET COMPRESSOR
		this.compressor = new PakoCompressor()
		this.setup()
	}

	/**
	 * Sets up the initial connection to the WebSocket.
	 */
	private setup() {
		this.connection()
	}

	/**
	 * Authenticates the client by sending credentials to the server.
	 */
	private authenticate() {
		try {
			const auth: IMessage = {
				timestamp: new Date().toISOString(),
				event: 'auth',
				payload: this.auth,
			}

			const msg = this.compressor.encode(JSON.stringify(auth))
			this.ws.send(msg)
		} catch (e) {
			this.trigger('error', e)
		}
	}

	/**
	 * Sends all queued messages if the client is authenticated and connected.
	 */
	private flushQueue() {
		if (!this.isAuthenticated || !this.isConnected) {
			console.warn('Cannot flush queue, not authenticated or not connected')
			return
		}

		const sendPromises = this.eventQueue.map((m) => {
			const msg = this.compressor.encode(JSON.stringify(m))
			return new Promise<void>((resolve, reject) => {
				try {
					this.ws.send(msg)
					resolve()
				} catch (error) {
					reject(error)
				}
			})
		})

		Promise.all(sendPromises)
			.then(() => {})
			.catch((error) => {
				console.error('Error sending messages:', error)
			})

		this.eventQueue = []
	}

	/**
	 * Establishes a WebSocket connection to the server.
	 */
	private connection() {
		if (this.isConnected) {
			console.warn('Already connected, closing existing connection')
			this.ws.close()
		}

		try {
			const websocket = new WebSocket(this.url)
			this.ws = websocket

			websocket.addEventListener('open', (event) => {
				this.isIntentionalDisconnect = false // Reset the flag
				this.authenticate()
				this.trigger('connect', event)
				this.status = ConnectionStatus.CONNECTED
				this.isConnected = true
			})

			websocket.addEventListener('close', (event) => {
				this.isConnected = false
				this.trigger('disconnect', event)
				this.status = ConnectionStatus.DISCONNECTED
				if (!this.isIntentionalDisconnect && this.options.reconnect) {
					this.reconnect()
				}
			})

			websocket.addEventListener('error', (event) => {
				this.trigger('error', event)
			})

			websocket.addEventListener('message', async ({ data }) => {
				try {
					const arrayBuffer = await new Promise<ArrayBuffer>(
						(resolve, reject) => {
							const reader = new FileReader()
							reader.onload = () => resolve(reader.result as ArrayBuffer)
							reader.onerror = reject
							reader.readAsArrayBuffer(data)
						}
					)

					const msgData = this.compressor.decode(
						new Uint8Array(arrayBuffer)
					)
					const { event, timestamp, payload } = JSON.parse(
						msgData
					) as IMessage

					if (event === 'auth') {
						this.isAuthenticated = payload?.ok ?? false
						if (this.isAuthenticated) this.flushQueue()
					} else {
						this.trigger('*', { event, timestamp, payload })
					}

					this.trigger(event, { event, timestamp, payload })
				} catch (e) {
					this.trigger('error', {
						message: 'Failed to parse message',
						error: e,
					})
				}
			})
		} catch (e) {
			this.trigger('error', e)
		}
	}

	/**
	 * Calls all registered listeners for a given event.
	 * @param eventName - The name of the event.
	 * @param args - The arguments to pass to the listeners.
	 */
	private trigger(eventName: string, ...args: any[]) {
		if (!this.eventListeners[eventName]) return

		this.eventListeners[eventName].forEach((handler) => {
			handler(...args)
		})
	}

	/**
	 * Registers a listener for a specific event.
	 * @param eventName - The name of the event.
	 * @param handler - The function to execute when the event occurs.
	 */
	public on<K extends keyof EventMap>(eventName: K, handler: EventMap[K]): void
	public on(eventName: string, handler: (args: IMessage) => void): void

	public on(eventName: string, handler: (...args: any[]) => void) {
		if (!this.eventListeners[eventName]) {
			this.eventListeners[eventName] = []
		}
		this.eventListeners[eventName].push(handler)
	}

	/**
	 * Sends an event to the server.
	 * @param eventName - The name of the event to send.
	 * @param payload - The additional data for the event.
	 * @returns A promise that resolves when the message is sent.
	 */
	public emit(eventName: string, payload: IMessage['payload']): Promise<void> {
		let m: IMessage = {
			timestamp: new Date().toISOString(),
			event: eventName,
			payload, // Changed from 'data' to 'payload'
		} as IMessage

		if (!this.isConnected) {
			this.eventQueue.push(m)
			return Promise.resolve()
		}

		return new Promise((resolve, reject) => {
			try {
				const msg = this.compressor.encode(JSON.stringify(m))
				this.ws.send(msg)
				resolve()
			} catch (error) {
				reject(error)
			}
		})
	}

	/**
	 * Disconnects the WebSocket client and updates the connection status.
	 * Sets the intentional disconnect flag to prevent reconnection.
	 */
	public disconnect() {
		this.isIntentionalDisconnect = true // Mark this as an intentional disconnect
		this.status = ConnectionStatus.DISCONNECTED
		this.isConnected = false
		if (this.ws) {
			this.ws.close()
		}
	}

	/**
	 * Attempts to reconnect to the server if the connection is lost.
	 */
	private reconnect(): void {
		if (
			this.status === ConnectionStatus.DISCONNECTED &&
			this.options.reconnect &&
			!this.isIntentionalDisconnect // Only attempt reconnect if not intentionally disconnected
		) {
			if (this.reconnectAttempts < this.options.reconnectionMaxAttempts) {
				this.reconnectAttempts++
				this.status = ConnectionStatus.RECONNECTING
				this.trigger('reconnect_attempt', this.reconnectAttempts)
				setTimeout(
					() => this.connection(),
					this.options.reconnectionInterval
				)
			} else {
				this.trigger('reconnect_failed', this.reconnectAttempts)
			}
		}
	}
}
