import { ModalsProvider as MantineModalsProvider } from "@mantine/modals";
import { GameSettingsModal } from "../modals/GameSettingsModal";

export const modals = {
  gameSettings: GameSettingsModal,
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
