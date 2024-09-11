interface IAuth {
	publicKey: string
	secretKey: string
}

interface EventMap {
	connect: (data: Event) => void
	disconnect: (data: CloseEvent) => void
	error: (data: Error) => void
}

interface IMessage {
	timestamp: string
	event: string
	payload?: Record<string, any>
}

export class Client {
	private ws!: WebSocket

	private auth!: IAuth

	private url: string

	private isAuthenticated = false

	private eventQueue: IMessage[] = []

	private eventListeners: {
		[key: string]: Function[]
	} = {}

	constructor(url: string, auth: IAuth) {
		this.url = url
		this.auth = auth
		this.setup()
	}

	private setup() {
		this.getConnection()
	}

	//→ AUTHENTICATE  (AUTH EVENT)

	private authenticate() {
		try {
			this.ws.send(JSON.stringify({ event: 'auth', payload: this.auth }))
		} catch (e) {
			this.trigger('error', e)
		}
	}

	//→ FLUSH QUEUE

	private flushQueue() {
		this.eventQueue.forEach((m) => this.ws.send(JSON.stringify(m)))
		this.eventQueue = []
	}

	//→ CREATE CONNECTION

	private getConnection() {
		try {
			const websocket = new WebSocket(this.url)

			this.ws = websocket

			websocket.addEventListener('open', (event) => {
				this.authenticate()
				this.trigger('connect', event)
			})

			websocket.addEventListener('close', (event) => {
				this.trigger('disconnect', event)
			})

			websocket.addEventListener('error', (event) => {
				this.trigger('error', event)
			})

			//→ GET ALL EVENTS

			websocket.addEventListener('message', (event) => {
				this.trigger('message', event)
			})

			//→ HANDLE CUSTOM EVENTS

			websocket.addEventListener('message', async ({ data }) => {
				try {
					const { event, ...rest } = JSON.parse(data) as IMessage

					if (event === 'auth') {
						this.isAuthenticated = rest.payload?.ok ?? false
						if (this.isAuthenticated) this.flushQueue()
					}

					this.trigger(event, { event, ...rest })
				} catch (e) {
					this.trigger('error', {
						message: 'Invalid JSON',
						error: e,
					})
				}
			})
		} catch (e) {
			this.trigger('error', e)
		}
	}

	//→ TRIGGER EVENTS

	private trigger(eventName: string, ...args: any[]) {
		if (!this.eventListeners[eventName]) return

		this.eventListeners[eventName].forEach((handler) => {
			handler(...args)
		})
	}

	//→ LISTEN EVENTS

	public on<K extends keyof EventMap>(eventName: K, handler: EventMap[K]): void
	public on(eventName: string, handler: (args: IMessage) => void): void

	public on(eventName: string, handler: (...args: any[]) => void) {
		if (!this.eventListeners[eventName]) {
			this.eventListeners[eventName] = []
		}
		this.eventListeners[eventName].push(handler)
	}

	//→ TODO:EMIT EVENTS

	public emit(eventName: string, payload: any) {
		const m: IMessage = {
			event: eventName,
			timestamp: new Date().toISOString(),
			payload: payload,
		}

		//→ IF ISAUTHENTICATED IS FALSE, ADD TO QUEUE

		if (!this.isAuthenticated) {
			this.eventQueue.push(m)

			return
		}

		this.ws.send(JSON.stringify(m))
	}
}
