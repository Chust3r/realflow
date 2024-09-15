export const code = `
\`\`\`sh
npm install @chust3r/websocket-client
\`\`\`
`

export const client = `
\`\`\`ts
import { WebSocketClient } from "@chust3r/websocket-client"

const ws = new WebSocketClient("${process.env.NEXT_PUBLIC_WS_URL}",{
    useCompression: true,
    query: {
        publicKey: "your_public_key",
        secretKey: "your_secret_key"
    }
})
\`\`\`
`

export const listen = `
\`\`\`ts
ws.on("connect", () => {
    console.log("Connected to server")
})

ws.on("message", ({event, timestamp, data}) => {
    console.log("Received message:", data)
})

ws.onAny(({event, timestamp, data}) => {
    console.log("Received event:", event)
})
\`\`\`
`
export const emit = `
\`\`\`ts
ws.on("connect", () => {

    ws.emit("message", "Hello, server!")

    ws.emit("other-event", {
        message: "Hi, client!",
    })
})
\`\`\`
`
