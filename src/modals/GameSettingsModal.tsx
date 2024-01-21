import { useState } from "react";

import { Button, Group, NumberInput, Stack, Text } from "@mantine/core";
import { useBattleshipGame } from "../hooks/useBattleshipGame";
import { ContextModalProps } from "@mantine/modals";

export const GameSettingsModal = ({ context, id }: ContextModalProps) => {
  const battleshipGame = useBattleshipGame();

  const [boardSize, setBoardSize] = useState<string | number>(
    battleshipGame.boardSize,
  );
  const [shipTypes, setShipTypes] = useState(battleshipGame.shipTypes);

  const closeModal = () => context.closeModal(id);
  const saveSettings = () => {
    battleshipGame.init({ boardSize: Number(boardSize), shipTypes });
    battleshipGame.reset();
    closeModal();
  };

  type ShipTypeKey = keyof typeof shipTypes;
  type ShipTypeProp = keyof (typeof shipTypes)[ShipTypeKey];

  const updateShipTypes =
    (shipName: ShipTypeKey, key: ShipTypeProp) => (count: string | number) =>
      setShipTypes((prev) => ({
        ...prev,
        [shipName]: { ...prev[shipName], [key]: count },
      }));

  return (
    <Stack>
      <NumberInput
        allowNegative={false}
        label="Game board size"
        value={boardSize}
        onChange={setBoardSize}
      />

      {Object.entries(shipTypes).map(([shipName, shipData]) => (
        <Group grow key={shipName}>
          <Text tt="capitalize">{shipName}</Text>
          <NumberInput
            label="Size"
            value={shipData.size}
            onChange={updateShipTypes(shipName as ShipTypeKey, "size")}
          />
          <NumberInput
            label="Count"
            value={shipData.count}
            onChange={updateShipTypes(shipName as ShipTypeKey, "count")}
          />
        </Group>
      ))}

      <Group mt="md" justify="flex-end">
        <Button variant="default" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="filled" onClick={saveSettings}>
          Save
        </Button>
      </Group>
    </Stack>
  );
};
