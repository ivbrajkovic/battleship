import miss from "../assets/miss.png";
import hit from "../assets/hit.png";

export const BOARD_SIZE = 5;

export const tileValueToImageMap: {
  [key: number]: string | undefined;
} = {
  0: undefined,
  [-1]: miss,
  [-2]: hit,
};
