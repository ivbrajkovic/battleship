import { Button, Group, Stack, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useBattleshipGame } from "../hooks/useBattleshipGame";

export const GameWonModal = ({ context, id }: ContextModalProps) => {
  const battleshipGame = useBattleshipGame();

  const closeModal = () => context.closeModal(id);
  const playAgain = () => {
    battleshipGame.reset();
    closeModal();
  };

  return (
    <Stack>
      <Text size="xl">
        You won the game in {battleshipGame.attackCount} turns!
      </Text>
      <Group mt="md" justify="flex-end">
        <Button variant="default" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="filled" onClick={playAgain}>
          Play Again
        </Button>
      </Group>
    </Stack>
  );
};
