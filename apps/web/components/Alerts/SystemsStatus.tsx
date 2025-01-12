"use client";
import { ActionIcon, Box, HoverCard } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

import { useAllSettings } from "@/hooks/utils/useAllSettings";

import { Alert } from "./Alert";

export function SystemsStatus() {
  const { data } = useAllSettings();

  if (
    !data ||
    data === "error" ||
    data === "unauthenticated" ||
    data.every((s) => s.systemMode === "ACTIVE")
  ) {
    return null;
  }

  const systems = data.filter((s) => s.systemMode !== "ACTIVE");

  return (
    <HoverCard shadow="md">
      <HoverCard.Target>
        <ActionIcon color="orange" size="lg" variant="light">
          <IconAlertTriangleFilled />
        </ActionIcon>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--mantine-spacing-xs)",
          }}
        >
          {systems.map((system) => (
            <Alert
              key={system.systemId}
              status={{
                status: system.systemMode === "DOWN" ? "error" : "warning",
                title: `${system.systemId.toUpperCase()} is in ${
                  system.systemMode
                } mode.`,
              }}
            />
          ))}
        </Box>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
