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
import { maskGame, rollDice } from "./gameLogic";
const PORT = process.env.PORT || 4000;

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
    id: rand,
    players: [],
    state: { state: "Preparing" }
  };
  console.log(`New game created with gameId: ${rand}`);
  res.send({ id: rand });
});

const emitMaskedGames = (game: DudoGame) => {
  game.players.forEach((player, playerId) => {
    io.to(`${game.id}_${playerId}`).emit("game", maskGame(playerId, game));
  });
};

io.on("connect", (socket) => {
  console.log("user connected!");

  socket.on("register", (gameId: string) => {
    const game = games[gameId];
    if (!game) {
      console.log("NO GAME");
      return;
    }

    if (game.players.length > 4 || game.state.state === "Rolled") {
      socket.emit(
        "error",
        `Game with game ID ${gameId} has already started or is full!`
      );
      socket.disconnect();
      return;
    }

    socket.join(gameId);

    if (!game) {
      socket.emit("error", `Game with game ID ${gameId} not found!`);
      return;
    }
    // Add new player
    games[gameId] = {
      ...games[gameId],
      players: [
        ...games[gameId].players,
        { dice: [null, null, null, null, null] }
      ]
    };
    const playerIx = games[gameId].players.length - 1;
    socket.join(`${gameId}_${playerIx}`);

    io.to(gameId).emit("game", games[gameId]);
    socket.emit("receiveIx", playerIx);
  });

  socket.on("start", (gameId: string) => {
    games[gameId] = rollDice(games[gameId]);
    emitMaskedGames(games[gameId]);
  });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
