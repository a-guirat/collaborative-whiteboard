import express from "express";
import http from "http";
import cors from "cors";
import { WebSocketServer } from "ws";
import { setupWebSocket } from "./websocket/socket";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Whiteboard backend running 🚀");
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server });
setupWebSocket(wss);

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});