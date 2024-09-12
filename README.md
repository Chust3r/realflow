<div align="center">
    <img src="./public/images/realflow.png" alt="RealFlow metrics"/>
</div>

# Realflow

**Realflow** is a real-time communication platform that enables the creation of customized channels for bidirectional message transmission. Inspired by services like Pusher, Realflow offers full control over channel configurations, including authentication, message retention, and detailed metrics.

## Table of Contents

-  [Features](#features)
-  [Technologies](#technologies)
-  [Requeriments](#requeriments)
-  [Installation](#installation)
-  [Usage](#usage)
-  [Contributing](#contributing)
-  [License](#license)

## Features

-  **Custom Channels**: Create channels with authentication, connection limits (_in development_, max limits are customizable in local development), and more.
-  **Real-time Metrics**: Monitor channel usage with detailed metrics.
-  **Message Retention**: Save and access historical messages in your channels (_in development_).
-  **Security**: Credential-based authentication with public and secret keys.
-  **User-friendly Interface**: Intuitive dashboard for managing and monitoring your channels.
-  **Real-time Communication**: Implements a real-time communication protocol with native WebSockets.
-  **Event**: Visualize events in real-time.

## Technologies

**This project uses the following technologies:**

-  **Next.js 14 App Router** (The React Framework for the Web)
-  **Auth.js v5** (Authentication for the Web.
   Free and open source)
-  **Drizzle ORM** (Drizzle ORM is a headless TypeScript ORM with a head)
-  **Shadcn UI** (Beautifully designed components that you can copy and paste into your apps.)
-  **Nanostores** (A tiny state manager for React, React Native, Preact, Vue, Svelte, Solid, Lit, Angular, and vanilla JS.)


## Requeriments

-  **Node.js v18 or higher**
-  **Bun v0.2.0 or higher**
-  **PostgreSQL v14 or higher**
-  **Visual Studio Code**
-  **RealFlow backend** [required](https://github.com/Chust3r/realflow-back)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/realflow.git
   cd realflow
   ```

2. Install the dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables like the following:

   ```

    # AUTH JS

    AUTH_SECRET=

    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/{YOUR_DATABASE_NAME}"

    # AUTH PROVIDERS

    AUTH_GOOGLE_ID =
    AUTH_GOOGLE_SECRET =

    GITHUB_ID=
    GITHUB_CLIENT_SECRET=

    # REALFLOW BACKEND URL

    NEXT_PUBLIC_WS_URL = {YOUR_WEBSOCKET_URL}

    # LIMITS

    MAX_ROOMS = 3
    MAX_CONNECTIONS = 20
    MAX_SECRET_KEYS = 3

   ```

4. Run database migrations:

   ```bash
   bun db:migrate
   ```

5. Start the application:

   ```bash
   bun dev
   ```

## Usage

### Creating a Channel

You can create a channel using the Realflow dashboard. Simply go to the **Dashboard** section and follow the instructions to set up your first channel.

<div align="center"><img src="./public/images/realflow-dashboard.png" alt="RealFlow dashboard"/></div>

### Channel Authentication (in development)

You can protected your channels with authentication, generate a public and secret key, and manage them in the Realflow dashboard.

<div align="center"><img src="./public/images/realflow-dashboard-auth.png" alt="RealFlow dashboard"/></div>

### Real-time Metrics

You can monitor channel usage with detailed metrics in the Realflow dashboard.

div align="center"><img src="./public/images/realflow-dashboard-metrics.png" alt="RealFlow dashboard"/></div>

### Events

Events are visualized in real-time in the Realflow dashboard.

<div align="center"><img src="./public/images/realflow-dashboard-events.png" alt="RealFlow dashboard"/></div>

## Contributing

<a href="https://github.com/Chust3r/realflow/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Chust3r/realflow" />
</a>

## License

[GPL-3.0 License](https://github.com/Chust3r/realflow/blob/main/LICENSE)
