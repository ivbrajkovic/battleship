import { tileValueToImageMap } from "../constants/constants";
import { Image, Paper, SimpleGrid, UnstyledButton } from "@mantine/core";

import classes from "./Board.module.css";

type BoardProps = {
  size: number;
  data: number[];
  onTileClick: (index: number) => void;
};

export const Board = (props: BoardProps) => {
  return (
    <Paper withBorder shadow="md" p="xl">
      <SimpleGrid
        className={classes.board}
        style={{ "--size": props.size.toString() }}
      >
        {props.data.map((value, i) => {
          return (
            <UnstyledButton
              key={i}
              className={classes.tile}
              onClick={() => props.onTileClick(i)}
            >
              <Image src={tileValueToImageMap[value]} alt={value.toString()} />
            </UnstyledButton>
          );
        })}
      </SimpleGrid>
    </Paper>
  );
};
