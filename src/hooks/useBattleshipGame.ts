import { useContext } from "react";
import { BattleshipGameContext } from "../providers/GameProvider";

export const useBattleshipGame = () => {
  const battleshipGame = useContext(BattleshipGameContext);
  if (!battleshipGame)
    throw new Error(
      "useBattleshipGame must be used within a BattleshipGameProvider",
    );
  return battleshipGame;
};
