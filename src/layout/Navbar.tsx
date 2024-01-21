import { ReactNode } from "react";
import {
  ActionIcon,
  NavLink,
  Stack,
  Tooltip,
  TooltipProps,
  useMantineColorScheme,
} from "@mantine/core";
import { IconRefresh, IconTool } from "@tabler/icons-react";

import { IconColorScheme } from "../components/IconColorScheme/IconColorScheme";
import { useBattleshipGame } from "../hooks/useBattleshipGame";
import { useIsMobile } from "../hooks/useIsMobile";
import { openGameSettingsModal } from "../utility/modals";

type NavbarTooltipProps = TooltipProps & {
  children: ReactNode;
};

const NavbarTooltip = (props: NavbarTooltipProps) => (
  <Tooltip
    offset={10}
    position="right"
    openDelay={500}
    closeDelay={100}
    transitionProps={{ duration: 300 }}
    {...props}
  />
);

type NavbarProps = {
  toggleNavbarOpen: () => void;
};

export const Navbar = (props: NavbarProps) => {
  const isMobile = useIsMobile();
  const battleshipGame = useBattleshipGame();
  const { toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  if (isMobile)
    return (
      <Stack py="md" align="center">
        <NavLink
          label="Reset game"
          leftSection={<IconRefresh />}
          onClick={() => {
            battleshipGame.reset();
            props.toggleNavbarOpen();
          }}
        />
        <NavLink
          label="Toggle color scheme"
          leftSection={<IconColorScheme />}
          onClick={() => {
            toggleColorScheme();
            props.toggleNavbarOpen();
          }}
        />
      </Stack>
    );

  return (
    <Stack py="md" align="center">
      <NavbarTooltip label="Reset game">
        <ActionIcon size="xl" radius="md" onClick={battleshipGame.reset}>
          <IconRefresh />
        </ActionIcon>
      </NavbarTooltip>
      <NavbarTooltip label="Toggle color scheme">
        <ActionIcon size="xl" radius="md" onClick={toggleColorScheme}>
          <IconColorScheme />
        </ActionIcon>
      </NavbarTooltip>
      <NavbarTooltip label="Game settings">
        <ActionIcon size="xl" radius="md" onClick={openGameSettingsModal}>
          <IconTool />
        </ActionIcon>
      </NavbarTooltip>
    </Stack>
  );
};
