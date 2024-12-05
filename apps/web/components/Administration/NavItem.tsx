"use client";
import { Paper, Title } from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";

import classes from "./NavItem.module.css";

interface Props {
  disabled?: boolean;
  link: NavLink;
}

export function AdministrationNavItem({ disabled, link }: Props) {
  return (
    <Paper
      component={disabled ? undefined : Link}
      href={link.href}
      className={clsx(classes.container, {
        [classes.disabled]: disabled,
      })}
      withBorder
    >
      <link.icon className={classes.content} size={64} />
      <Title className={classes.content} order={4}>
        {link.label}
      </Title>
    </Paper>
  );
}
