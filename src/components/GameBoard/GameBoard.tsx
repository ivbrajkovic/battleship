import { Box, Paper, SimpleGrid, UnstyledButton } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

import { useBattleshipGameBoard } from "../../hooks/useBattleshipGameBoard";
import { useBattleshipGame } from "../../hooks/useBattleshipGame";

import classes from "./GameBoard.module.css";

export const GameBoard = () => {
  const battleshipGame = useBattleshipGame();
  const battleshipGameBoard = useBattleshipGameBoard(battleshipGame);

  const attack = (index: number) => () => battleshipGame.attack(index);

  return (
    <Paper withBorder shadow="md" p="xl">
      <SimpleGrid
        className={classes.board}
        style={{ "--size": battleshipGame.boardSize }}
      >
        {battleshipGameBoard.map((value, i) => (
          <UnstyledButton key={i} className={classes.tile} onClick={attack(i)}>
            {value === -1 ? (
              <Box c="dark.4" h="100%" w="100%" component={IconX} />
            ) : value === -2 ? (
              <Box c="red" h="100%" w="100%" component={IconX} />
            ) : null}
          </UnstyledButton>
        ))}
      </SimpleGrid>
    </Paper>
  );
};
