import { DiceValue, DudoGame, Player, PlayerDice } from "../types/dudo";

const rollPlayer = (player: Player): Player => {
  return {
    ...player,
    dice: [
      (Math.round(Math.random() * 5) + 1) as DiceValue,
      (Math.round(Math.random() * 5) + 1) as DiceValue,
      (Math.round(Math.random() * 5) + 1) as DiceValue,
      (Math.round(Math.random() * 5) + 1) as DiceValue,
      (Math.round(Math.random() * 5) + 1) as DiceValue
    ]
  };
};

export const rollDice = (game: DudoGame): DudoGame => {
  return {
    ...game,
    players: game.players.map(rollPlayer),
    state: {
      state: "Rolled",
      currentPlayer:
        game.state.state === "Rolled" ? game.state.currentPlayer + 1 : 0
    }
  };
};

const maskedDice: PlayerDice = [
  "hidden",
  "hidden",
  "hidden",
  "hidden",
  "hidden"
];

// export const mask = (
//   gameId: string,
//   playerIndex: number,
//   games: { [key: string]: DudoGame }
// ): { [key: string]: DudoGame } => ({
//   ...games,
//   [gameId]: maskGame(playerIndex, games[gameId])
// });

export const maskGame = (playerIndex: number, game: DudoGame): DudoGame => ({
  ...game,
  players: game.players.map((player, ix) =>
    ix !== playerIndex ? { ...player, dice: maskedDice } : player
  )
});
