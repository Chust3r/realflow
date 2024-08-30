export const code = `
\`\`\`sh
npm install socket.io
\`\`\`
`

export const client = `
\`\`\`ts
import { io } from "socket.io"

const client = io('${process.env.NEXT_PUBLIC_WS_URL}', {
				path: '/api/ws',
                transports:["websocket"],
				auth: {
					publicKey:'YOUR_PUBLIC_KEY',
                    secretKey: 'YOUR_SECRET_KEY',
                    },
                })
\`\`\`
`

export const listen = `
\`\`\`ts
client.on("connect", () => {
    console.log("Connected to server")
})

client.on("message", (message) => {
    console.log("Received message:", message)
})
\`\`\`
`
export const emit = `
\`\`\`ts
client.emit("message", "Hello, server!")

client.emit("custom-event", { foo: "bar" })
\`\`\`
`
