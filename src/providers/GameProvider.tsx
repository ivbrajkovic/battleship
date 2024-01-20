import { ReactNode, createContext, useState } from "react";
import { BattleshipGame } from "../class/BattleshipGame";

import { BOARD_SIZE } from "../constants/constants";
import { shipTypes } from "../data.json";

export const BattleshipGameContext = createContext<BattleshipGame | null>(null);

const createGame = () => {
  const game = BattleshipGame.getInstance();
  game.init({ shipTypes, boardSize: BOARD_SIZE });
  return game;
};

export const GameProvider = (props: { children: ReactNode }) => {
  const [game] = useState(createGame);
  return (
    <BattleshipGameContext.Provider value={game}>
      {props.children}
    </BattleshipGameContext.Provider>
  );
};
