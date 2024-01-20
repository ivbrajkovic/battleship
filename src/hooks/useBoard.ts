import { useCallback, useEffect, useState } from "react";
import { CellStatus, Layout } from "../class/type";
import { createBoard } from "../utils/createBoard";

export const useBoard = (size: number, layout: Layout[]) => {
  const [board, setBoard] = useState<CellStatus[]>([]);
  const [invalidShips, setInvalidShips] = useState<Layout[]>([]);

  const updateBoard = useCallback(
    (index: number, status: CellStatus) =>
      setBoard((prev) => {
        prev[index] = status;
        return [...prev];
      }),
    [],
  );

  useEffect(() => {
    const board = createBoard(size, layout);
    setBoard(board.grid);
    setInvalidShips(board.invalidShips);
  }, [layout, size]);

  return { board, updateBoard, invalidShips };
};
