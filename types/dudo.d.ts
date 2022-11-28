type GameState =
  | { state: "Preparing" }
  | { state: "Rolled"; currentPlayer: number };

export type DudoGame = {
  id: string;
  players: Player[];
  state: GameState;
};

export type PlayerDice = [Dice, Dice, Dice, Dice, Dice];
export type Player = {
  dice: PlayerDice;
};

export type Dice = DiceValue | null | "hidden";
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

// SOCKET.IO TYPES

interface ServerToClientEvents {
  error: (error: string) => void;
  receiveIx: (ix: number) => void;
  game: (game: DudoGame) => void;
}

interface ClientToServerEvents {
  register: (gameId: string) => void;
  start: (gameId: string) => Void;
  roll: (gameId: string) => void;
  makeBid: (gameId: string) => void;
}

interface InterServerEvents {}

interface SocketData {
  playerIx: number;
}
