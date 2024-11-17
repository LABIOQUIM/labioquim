"use client";
import { Fragment } from "react";
import { Box, Paper, Text, Title } from "@mantine/core";
import clsx from "clsx";

import { useSimulationQueueInformation } from "@/hooks/administration/useSimulationQueueInformation";

import classes from "./QueueInfo.module.css";

export function AdminSimulationQueueInfo() {
  const { data, isLoading } = useSimulationQueueInformation();

  if (isLoading) {
    return null;
  }

  if (!data || data === "unauthenticated") {
    return null;
  }

  return (
    <Fragment>
      <Title order={2}>Queue Info</Title>
      <Paper className={classes.container} withBorder>
        {Object.entries(data).map(([key, value]) => (
          <Box className={clsx(classes.info_container, classes[key])} key={key}>
            <Text className={classes.info_value}>{value}</Text>
            <Title className={classes.info_title} order={4}>
              {key}
            </Title>
          </Box>
        ))}
      </Paper>
    </Fragment>
  );
}
