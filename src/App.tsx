import { useState } from "react";
import { BattleshipGame } from "./class/BattleshipGame";
import { ShipTypes } from "./type";
import { Board } from "./components/Board";
import { Container } from "@mantine/core";

import { Layout } from "./layout/Layout";
import { BOARD_SIZE } from "./constants/constants";

import "./class/BattleshipGame";

const shipTypes: ShipTypes = {
  carrier: { size: 5, count: 1 },
  battleship: { size: 4, count: 1 },
  cruiser: { size: 3, count: 1 },
  submarine: { size: 3, count: 1 },
  destroyer: { size: 2, count: 2 },
};

const game = BattleshipGame.getInstance();
game.init({ shipTypes, boardSize: BOARD_SIZE });

function App() {
  const [board, setBoard] = useState(game.board);
  const refreshBoard = () => setBoard(game.board);

  const handleTileClick = (index: number) => {
    game.attack(index);
    refreshBoard();
  };

  return (
    <Layout>
      <Container>
        <Board size={BOARD_SIZE} data={board} onTileClick={handleTileClick} />
      </Container>
    </Layout>
  );
}

export default App;
