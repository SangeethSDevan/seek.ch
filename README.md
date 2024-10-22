# seek.ch

Seek.ch is a real-time chat application that allows users to communicate with each other instantly. The app is built using **Node.js**, **Express**, and **Socket.io** to facilitate seamless real-time communication without relying on a database for message storage.

## Features

- **Real-time messaging**: Users can chat with each other in real time.
- **No database required**: Messages are exchanged directly through the server using Socket.io, without storing any messages.
- **Room-based communication**: Users can join rooms for focused conversations.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime environment.
- **Express**: Fast and minimal web framework for Node.js.
- **Socket.io**: Enables real-time, bi-directional communication between web clients and servers.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SangeethSDevan/seek.ch.git
    ```

2. Navigate into the project directory:

    ```bash
    cd seek.ch
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to:

    ```bash
    http://localhost:8000
    ```

## How It Works

1. Users can connect to the server through the web interface.
2. Messages are sent and received in real time using **Socket.io**.
3. Each user can join a specific chat room for group discussions.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
