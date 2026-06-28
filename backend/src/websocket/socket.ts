
import { WebSocketServer, WebSocket } from "ws";

// This function sets up all WebSocket logic for real-time communication
export function setupWebSocket(wss: WebSocketServer) {

  // We store all connected clients (users) in a Set
  // A Set automatically avoids duplicates
  const clients = new Set<WebSocket>();

  // This event runs every time a new client connects
  wss.on("connection", (socket) => {
    console.log("New client connected");

    // Add the new client to our list of connected users
    clients.add(socket);

    // This event runs every time the client sends a message
    // (example: drawing data, sticky note update, cursor position)
    socket.on("message", (msg) => {

      // Loop through all connected clients
      for (const client of clients) {

        // Only send if the connection is still open
        if (client.readyState === WebSocket.OPEN) {

          // Broadcast the message to everyone
          // (this is what makes real-time collaboration work)
          client.send(msg.toString());
        }
      }
    });

    // This event runs when a client disconnects (closes tab, loses connection)
    socket.on("close", () => {

      // Remove the client from the active list
      clients.delete(socket);

      console.log("Client disconnected");
    });
  });
}