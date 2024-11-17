"use client";
import { Box, Text } from "@mantine/core";

import { AdministrationNavItem } from "./NavItem";

import classes from "./NavSection.module.css";

interface Props {
  section: NavSection;
}

export function AdministrationNavSection({ section }: Props) {
  return (
    <Box className={classes.container}>
      <Text className={classes.section_title}>{section.title}</Text>
      <Box className={classes.links_container}>
        {section.links.map((link) => (
          <AdministrationNavItem key={JSON.stringify(link)} link={link} />
        ))}
      </Box>
    </Box>
  );
}
