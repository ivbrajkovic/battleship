import { ReactNode } from "react";
import { MantineProvider as Provider } from "@mantine/core";

export const MantineProvider = (props: { children: ReactNode }) => {
  return <Provider>{props.children}</Provider>;
};
