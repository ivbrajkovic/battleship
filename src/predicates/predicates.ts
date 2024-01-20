import { CellStatus } from "../class/type";

export const isCellEmpty = (x: number, y: number, grid: CellStatus[][]) =>
  grid[x][y] === "empty";

// check if all coordinates are on empty cells
export const isCellPositionEmpty = (
  positions: number[][],
  grid: CellStatus[][],
) => positions.every(([x, y]) => isCellEmpty(x, y, grid));

export const isWithinBounds = (
  x: number,
  y: number,
  width: number,
  height: number,
): boolean => x >= 0 && x < width && y >= 0 && y < height;

export const isPositionWithinBounds = (
  positions: number[][],
  width: number,
  height: number,
): boolean => positions.every(([x, y]) => isWithinBounds(x, y, width, height));

export const isHorizontal = (positions: number[][]) =>
  positions.every((pos) => pos[1] === positions[0][1]);

export const isVertical = (positions: number[][]) =>
  positions.every((pos) => pos[0] === positions[0][0]);

export const isHorizontalLayout = (x: number, positions: number[][]) =>
  x === positions[0][0];

export const isVerticalLayout = (y: number, positions: number[][]) =>
  y === positions[0][1];

export const isHorizontalOrVerticalLayout = (
  x: number,
  y: number,
  positions: number[][],
) => isHorizontalLayout(x, positions) || isVerticalLayout(y, positions);

export const isHorizontalOrVertical = (positions: number[][]) =>
  isHorizontal(positions) || isVertical(positions);
