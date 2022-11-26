import { useState, useEffect, useReducer } from "react";
import io, { Socket } from "socket.io-client";
import {
  DudoGame,
  ServerToClientEvents,
  ClientToServerEvents
} from "../../../types/dudo";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:4000",
  {
    transports: ["websocket"],
    autoConnect: false
  }
);

type Action =
  | { type: "SET_CONNECTED" }
  | { type: "SET_ERROR"; error: string }
  | { type: "ID_RECEIVED"; id: string }
  | { type: "GAME_RECEIVED"; game: DudoGame };

type State = {
  connected: boolean;
  error: string | null;
  playerId: string | null;
  game: DudoGame | null;
};

const initialState: State = {
  connected: false,
  error: null,
  playerId: null,
  game: null
};

const gameReducer = (state: State, action: Action) => {
  console.log(action);
  const { type } = action;
  switch (type) {
    case "SET_CONNECTED":
      return { ...state, connected: true };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "GAME_RECEIVED":
      return { ...state, game: action.game };
    case "ID_RECEIVED":
      return { ...state, playerId: action.id };
    default:
      return state;
  }
};

const Game = ({ id }: { id: string }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      dispatch({ type: "SET_CONNECTED" });
      socket.emit("register", id);
    });
    socket.on("error", (msg) => dispatch({ type: "SET_ERROR", error: msg }));
    socket.on("receiveId", (id) => dispatch({ type: "ID_RECEIVED", id }));
    socket.on("game", (game) => dispatch({ type: "GAME_RECEIVED", game }));
  }, [id]);

  return (
    <div>
      <p>
        Game {id} {state.connected ? "Connected!" : "Disconnected!"}
      </p>
      {state.playerId && <p>Your id: {state.playerId}</p>}
      {state.error && <p>{state.error}</p>}
      {state.game && <p>Players: {state.game.players.length}</p>}
    </div>
  );
};

export default Game;
