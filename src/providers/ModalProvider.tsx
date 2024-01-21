import { ModalsProvider as MantineModalsProvider } from "@mantine/modals";
import { GameSettingsModal } from "../modals/GameSettingsModal";
import { GameWonModal } from "../modals/GameWonModal";

export const modals = {
  gameSettings: GameSettingsModal,
  gameWon: GameWonModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export const ModalsProvider = (props: { children: React.ReactNode }) => (
  <MantineModalsProvider modals={modals}>
    {props.children}
  </MantineModalsProvider>
);
