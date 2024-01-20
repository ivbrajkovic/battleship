import cx from "clsx";
import { IconMoon, IconSun } from "@tabler/icons-react";

import classes from "./IconColorScheme.module.css";

export const IconColorScheme = () => (
  <>
    <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
    <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
  </>
);
