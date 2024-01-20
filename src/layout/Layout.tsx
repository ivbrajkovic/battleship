import { ReactNode } from "react";
import { AppShell, Group } from "@mantine/core";
import { IconDeviceGamepad2 } from "@tabler/icons-react";

import classes from "./Layout.module.css";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      classNames={{ main: classes.main }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <IconDeviceGamepad2 size={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
};
