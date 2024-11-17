"use client";
import { Paper, Title } from "@mantine/core";
import Link from "next/link";

import classes from "./NavItem.module.css";

interface Props {
  link: NavLink;
}

export function AdministrationNavItem({ link }: Props) {
  return (
    <Paper
      component={Link}
      href={link.href}
      className={classes.container}
      withBorder
    >
      <link.icon className={classes.content} size={64} />
      <Title className={classes.content} order={4}>
        {link.label}
      </Title>
    </Paper>
  );
}
