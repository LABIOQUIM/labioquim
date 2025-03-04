"use client";
import { Box } from "@mantine/core";
import {
  IconLayoutList,
  IconReportAnalytics,
  IconServer,
  IconSettings2,
  IconUsers,
} from "@tabler/icons-react";

import { AdministrationNavSection } from "./NavSection";

import classes from "./Nav.module.css";

const nav: NavSection[] = [
  {
    title: "LABIOQUIM",
    links: [
      {
        href: "/administration/users",
        icon: IconUsers,
        label: "Users",
      },
      {
        href: "/administration/server",
        icon: IconServer,
        disabled: true,
        label: "Server Manager",
      },
      {
        href: "/administration/settings",
        icon: IconSettings2,
        label: "App Settings",
      },
    ],
  },
  {
    title: "Visual Dynamics",
    links: [
      {
        href: "/administration/visualdynamics/status",
        icon: IconReportAnalytics,
        label: "Status",
      },
      {
        href: "/administration/visualdynamics/manage",
        icon: IconLayoutList,
        label: "Manage",
      },
      {
        href: "/administration/visualdynamics/settings",
        icon: IconSettings2,
        label: "Settings",
      },
    ],
  },
  {
    title: "PlasmoQSAR",
    disabled: true,
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
    disabled: true,
    links: [
      {
        href: "/administration/simulations",
        icon: IconReportAnalytics,
        label: "Analytics",
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
