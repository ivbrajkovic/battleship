import { createSlice } from "@reduxjs/toolkit";
import {
  createShipByPositionLookupTable,
  extendShipTypesMap,
  getShipCount,
} from "./utils/createData";
import data from "./data.json";

const initialState = {
  sunkenShipCount: 0,
  shipCount: getShipCount(data.shipTypes),
  shipTypes: extendShipTypesMap(data.shipTypes),
  shipByPositionLookupTable: createShipByPositionLookupTable(data.layout),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    fire: (state, action) => {
      const { x, y } = action.payload;
      // check if already hit

      const shipType = state.shipByPositionLookupTable[`${x}-${y}`];
      if (shipType) {
        // hit
        state.shipTypes[shipType].hits++;
        if (state.shipTypes[shipType].hits === state.shipTypes[shipType].size)
          state.sunkenShipCount++;
      }
    },
  },
});

export default gameSlice.reducer;

// export const {} = gameSlice.actions;
