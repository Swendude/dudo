type GameState = "Preparing" | "Rolled";

export type DudoGame = {
  players: Player[];
  state: GameState;
};

export type PlayerDice = [Dice, Dice, Dice, Dice, Dice];
export type Player = {
  dice: PlayerDice;
};

export type Dice = DiceValue | null;
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

// SOCKET.IO TYPES

interface ServerToClientEvents {
  error: (error: string) => void;
  receiveId: (id: number) => void;
  game: (game: DudoGame) => void;
}

interface ClientToServerEvents {
  register: (gameId: string) => void;
  roll: (gameId: string) => void;
}

interface InterServerEvents {}

interface SocketData {}
