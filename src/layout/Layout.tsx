import { ReactNode } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Navbar } from "./Navbar";
import { Header } from "./Header";

import classes from "./Layout.module.css";

export const Layout = (props: { children: ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding={{ base: "sm", sm: "xl" }}
      header={{ height: 60 }}
      navbar={{
        width: { base: 56 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      classNames={{ main: classes.main }}
    >
      <AppShell.Header>
        <Header isNavbarOpen={opened} toggleNavbarOpen={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar toggleNavbarOpen={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
};
