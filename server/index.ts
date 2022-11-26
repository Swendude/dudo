import express from "express";
import http from "http";
import cors from "cors";
import { Socket, Server } from "socket.io";
import {
  DudoGame,
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData,
  InterServerEvents
} from "../types/dudo";
const PORT = 4000;

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server);

const games: { [key: string]: DudoGame } = {};

app.get("/game", (req, res) => {
  const rand = Math.random().toString().slice(2, 8);
  // Create new game
  games[rand] = {
    players: []
  };
  console.log(games);
  res.send({ id: rand });
});
io.on("connect", (socket) => {
  console.log("user connected!");
  socket.on("register", (gameId: string) => {
    const game = games[gameId];
    if (!game) {
      socket.emit("error", `Game with game ID ${gameId} not found!`);
      return;
    }
    // socket.join(gameId);

    // socket.join(playerId);
    // Add new player
    games[gameId] = {
      ...games[gameId],
      players: [
        ...games[gameId].players,
        { dice: [null, null, null, null, null] }
      ]
    };
    const playerId = (games[gameId].players.length + 1).toString();
    socket.emit("game", games[gameId]);
    console.log(games[gameId]);
    socket.emit("receiveId", playerId);
    console.log(`registered on game ${gameId}`);
  });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
