import { ReactNode, createContext, useState } from "react";
import { BattleshipGame, ShipTypes } from "../class/BattleshipGame";

export const BattleshipGameContext = createContext<BattleshipGame | null>(null);

type InitialData = {
  boardSize: number;
  shipTypes: ShipTypes;
};

type GameProviderProps = {
  initial: InitialData;
  children: ReactNode;
};

const createGame = (props: InitialData) => {
  const game = BattleshipGame.getInstance();
  game.init(props);
  return game;
};

export const GameProvider = (props: GameProviderProps) => {
  const [game] = useState(() => createGame(props.initial));
  return (
    <BattleshipGameContext.Provider value={game}>
      {props.children}
    </BattleshipGameContext.Provider>
  );
};
