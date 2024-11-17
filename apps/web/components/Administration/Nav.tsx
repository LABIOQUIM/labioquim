"use client";
import { Box } from "@mantine/core";
import {
  IconReportAnalytics,
  IconServer,
  IconSettings2,
  IconUsers,
} from "@tabler/icons-react";

import { AdministrationNavSection } from "./NavSection";

import classes from "./Nav.module.css";

const nav: NavSection[] = [
  {
    title: "Users",
    links: [
      {
        href: "/administration/users",
        icon: IconUsers,
        label: "Users",
      },
    ],
  },
  {
    title: "Visual Dynamics",
    links: [
      {
        href: "/administration/simulations",
        icon: IconReportAnalytics,
        label: "Analytics",
      },
    ],
  },
  {
    title: "PlasmoQSAR",
    links: [
      {
        href: "/administration/qsar",
        icon: IconReportAnalytics,
        label: "Analytics",
      },
    ],
  },
  {
    title: "PlasmoIA",
    links: [
      {
        href: "/administration/simulations",
        icon: IconReportAnalytics,
        label: "Analytics",
      },
    ],
  },
  {
    title: "System",
    links: [
      {
        href: "/administration/server",
        icon: IconServer,
        label: "Server Manager",
      },
      {
        href: "/administration/settings",
        icon: IconSettings2,
        label: "App Settings",
      },
    ],
  },
];

export function AdministrationNav() {
  return (
    <Box className={classes.container}>
      {nav.map((section) => (
        <AdministrationNavSection
          key={JSON.stringify(section)}
          section={section}
        />
      ))}
    </Box>
  );
}
