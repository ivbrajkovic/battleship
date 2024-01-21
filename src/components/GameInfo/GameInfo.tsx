import { Paper, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

import { useBattleshipGame } from "../../hooks/useBattleshipGame";
import { ShipInfo } from "../ShipInfo/ShipInfo";

import classes from "./GameInfo.module.css";
import { openGameWonModal } from "../../utility/modals";

export const GameInfo = () => {
  const battleshipGame = useBattleshipGame();
  const [shipDetails, setShipDetails] = useState(
    () => battleshipGame.shipDetails,
  );

  useEffect(() => {
    const handleShipHit = (id: number) =>
      setShipDetails((shipsInfo) =>
        shipsInfo.map((shipInfo) =>
          shipInfo.id === id
            ? { ...shipInfo, hits: shipInfo.hits + 1 }
            : shipInfo,
        ),
      );

    battleshipGame.onShipDetailsChange = setShipDetails;
    battleshipGame.onShipHit = handleShipHit;
    battleshipGame.onGameWon = openGameWonModal;
  }, [battleshipGame]);

  return (
    <Paper withBorder shadow="md" className={classes.paper}>
      <Stack className={classes.stack}>
        {shipDetails.map((shipInfo) => (
          <ShipInfo key={shipInfo.id} {...shipInfo} />
        ))}
      </Stack>
    </Paper>
  );
};
