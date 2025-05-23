"use client";
import { Fragment } from "react";
import { Box, Text, Title } from "@mantine/core";
import {
  IconAlertTriangle,
  IconClockPause,
  IconExclamationMark,
} from "@tabler/icons-react";

import { Loader } from "@/components/Loader/Loader";
import { useRunningSimulation } from "@/hooks/simulation/useRunningSimulation";
import { useSettings } from "@/hooks/utils/useSettings";

import { RefetchTime } from "./RefetchTime";

import classes from "./Log.module.css";

export function Log() {
  const { data, isError, isLoading } = useRunningSimulation();
  const { data: settings } = useSettings("visualdynamics");

  if (settings === "error" || settings === "unauthenticated") {
    return "Failed to load settings";
  }

  if (settings?.systemMode === "MAINTENANCE") {
    return (
      <Box className={classes.containerDownOrMaintenance}>
        <IconAlertTriangle size={48} />
        <Title order={3}>
          Visual Dynamics is currently down for maintenance.
        </Title>
      </Box>
    );
  }

  if (settings?.systemMode === "DOWN") {
    return (
      <Box className={classes.containerDownOrMaintenance}>
        <IconAlertTriangle size={48} />
        <Title order={3}>Visual Dynamics is currently down.</Title>
      </Box>
    );
  }

  if (!data || isLoading) {
    return (
      <Box className={classes.container_loading}>
        <RefetchTime />
        <Loader />
      </Box>
    );
  }

  if (data === "unauthenticated" || isError) {
    return (
      <Box className={classes.container_loading}>
        <IconAlertTriangle size={64} />
        <Title order={3}>Something went wrong.</Title>
        <RefetchTime />
      </Box>
    );
  }

  if (data === "not-running") {
    return (
      <Box className={classes.not_running_container}>
        <IconExclamationMark size={64} />
        <Title order={3}>You have no simulation running.</Title>
        <RefetchTime />
      </Box>
    );
  }

  if (data === "queued") {
    return (
      <Box className={classes.not_running_container}>
        <IconClockPause size={64} />
        <Title order={3}>Your simulation is in queue.</Title>
        <RefetchTime />
      </Box>
    );
  }

  return (
    <Fragment>
      <Box className={classes.container_title}>
        <Title order={3}>Logs</Title>
        <RefetchTime />
      </Box>
      <Box className={classes.container}>
        {data.logData.map((line, idx) => (
          <Text key={line + idx}>{line}</Text>
        ))}
      </Box>
    </Fragment>
  );
}
