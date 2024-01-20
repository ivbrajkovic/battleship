import data from "./data.json";

export type ShipTypes = typeof data.shipTypes;
export type ShipType = keyof ShipTypes;

export type Position = [number, number];
// export type Layout = { ship: ShipType; positions: Position[] };
export type Layout = (typeof data.layout)[number];

export type Ship = {
  size: number;
  count: number;
  hits: number;
};
