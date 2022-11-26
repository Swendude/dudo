export type DudoGame = {
  players: Player[];
};

export type Player = {
  dice: [Dice, Dice, Dice, Dice, Dice];
};

export type Dice = DiceValue | null;
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

// SOCKET.IO TYPES

interface ServerToClientEvents {
  error: (error: string) => void;
  receiveId: (id: string) => void;
  game: (game: DudoGame) => void;
}

interface ClientToServerEvents {
  register: (gameId: string) => void;
}

interface InterServerEvents {}

interface SocketData {}
