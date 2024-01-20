import { Burger, Group, Title } from "@mantine/core";
import { IconDeviceGamepad2 } from "@tabler/icons-react";

import classes from "./Header.module.css";

type HeaderProps = {
  isNavbarOpen: boolean;
  toggleNavbarOpen: () => void;
};

export const Header = (props: HeaderProps) => {
  return (
    <Group h="100%" px="md">
      <Burger
        size="sm"
        hiddenFrom="sm"
        className={classes.burger}
        opened={props.isNavbarOpen}
        onClick={props.toggleNavbarOpen}
      />
      <Group gap="xs" className={classes.title}>
        <IconDeviceGamepad2 size={30} className={classes.icon} />
        <Title order={4}>Battleship</Title>
      </Group>
    </Group>
  );
};
