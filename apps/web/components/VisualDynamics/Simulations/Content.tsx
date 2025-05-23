"use client";

import { Box, Title } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

import { Container } from "@/components/Layout/Container";
import { Loader } from "@/components/Loader/Loader";
import { useLatestSimulations } from "@/hooks/simulation/useLatestSimulations";
import { useSettings } from "@/hooks/utils/useSettings";

import { SimulationCard } from "./SimulationCard/SimulationCard";

import classes from "./Content.module.css";

export function SimulationsContent() {
  const { data, isLoading } = useLatestSimulations();
  const { data: settings } = useSettings("visualdynamics");

  if (settings === "error" || settings === "unauthenticated") {
    return "Failed to load settings";
  }

  if (settings?.systemMode === "DOWN") {
    return (
      <Box className={classes.containerDownOrMaintenance}>
        <IconAlertTriangle size={48} />
        <Title order={3}>Visual Dynamics is currently down.</Title>
      </Box>
    );
  }

  if (data === "unauthenticated") {
    return null;
  }

  if (isLoading) {
    return (
      <Container className={classes.containerDownOrMaintenance}>
        <Loader />
      </Container>
    );
  }

  if (!data) {
    return "erro";
  }

  return (
    <Container className={classes.container}>
      {Object.keys(data).map((s, i) => (
        <SimulationCard
          key={data[s as keyof typeof data]?.id || `${i}-simulation-card`}
          simulation={data[s as keyof typeof data]}
          type={s as keyof typeof data}
        />
      ))}
    </Container>
  );
}
