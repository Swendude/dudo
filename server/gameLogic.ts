import { DiceValue, DudoGame, Player } from "../types/dudo";

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
  return { ...game, players: game.players.map(rollPlayer), state: "Rolled" };
};
