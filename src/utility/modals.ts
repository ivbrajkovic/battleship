import { openContextModal } from "@mantine/modals";

export const openGameSettingsModal = () =>
  openContextModal({
    modal: "gameSettings",
    title: "Game Settings",
    innerProps: {},
  });

export const openGameWonModal = () =>
  openContextModal({
    modal: "gameWon",
    title: "Congratulations!",
    innerProps: {},
  });
