import { Box } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

import { ShipDetails } from "../../class/BattleshipGame";
import { shipImages } from "../../constants/constants";

import classes from "./ShipInfo.module.css";

const createHitsArray = (hits: number, size: number) =>
  Array.from({ length: size }, (_, index) => index < hits);

export const ShipInfo = (props: ShipDetails) => {
  const hitsArray = createHitsArray(props.hits, props.size);
  const isSunk = hitsArray.every((isHit) => isHit);
  const shipImage = shipImages[props.type as keyof typeof shipImages];

  return (
    <Box opacity={isSunk ? 0.4 : 1} className={classes.container}>
      <img src={shipImage} className={classes.shipImage} />
      <Box className={classes.hitsContainer}>
        {hitsArray.map((isHit, index) => (
          <div key={index} className={classes.hit}>
            {isHit ? <IconX className={classes.icon} /> : null}
          </div>
        ))}
      </Box>
    </Box>
  );
};
