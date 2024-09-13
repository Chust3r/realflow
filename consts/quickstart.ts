export const code = `
\`\`\`sh
npm install realflow-client
\`\`\`
`

export const client = `
\`\`\`ts
import { Client } from "realflow-client"

const client = new Client("${process.env.NEXT_PUBLIC_WS_URL}",{
    publicKey: "your_public_key",
    secretKey: "your_secret_key"
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

client.on("*",(data) => {
    console.log("Received event:", data)
})
\`\`\`
`
export const emit = `
\`\`\`ts
client.on("connect", () => {

    client.emit("message", "Hello, server!")

    client.emit("other-event", {
        message: "Hi, client!",
    })
})
\`\`\`
`
