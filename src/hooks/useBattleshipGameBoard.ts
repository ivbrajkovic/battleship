import { useEffect, useState } from "react";
import { BattleshipGame } from "../class/BattleshipGame";

export const useBattleshipGameBoard = (battleshipGame: BattleshipGame) => {
  const [gameBoard, setGameBoard] = useState(() => battleshipGame.board);
  useEffect(() => {
    battleshipGame.onBoardChange = setGameBoard;
  }, [battleshipGame]);
  return gameBoard;
};
