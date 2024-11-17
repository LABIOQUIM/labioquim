"use client";
import { Fragment } from "react";
import { Box, Paper, SemiCircleProgress, Text, Title } from "@mantine/core";

import { useSimulationSystemInformation } from "@/hooks/administration/useSystemInformation";

import classes from "./SystemInfo.module.css";

function getSegmentColor(val: number) {
  if (val > 90) {
    return "red";
  }

  if (val > 60) {
    return "orange";
  }

  if (val > 30) {
    return "gold";
  }

  return "green";
}

export function AdminSimulationSystemInfo() {
  const { data, isLoading } = useSimulationSystemInformation();

  if (isLoading) {
    return null;
  }

  if (!data || data === "unauthenticated") {
    return null;
  }

  const storagePercentage = Number(
    ((data.fs.used / data.fs.size) * 100).toFixed(2)
  );
  const storageFormattedUsage = `${(data.fs.used / Math.pow(1024, 3)).toFixed(
    2
  )} GB`;
  const storageFormattedTotal = `${(data.fs.size / Math.pow(1024, 4)).toFixed(
    2
  )} TB`;

  const memoryPercentage = Number(
    ((data.mem.used / data.mem.total) * 100).toFixed(2)
  );
  const memoryFormattedUsage = `${(data.mem.used / Math.pow(1024, 3)).toFixed(
    2
  )} GB`;
  const memoryFormattedTotal = `${(data.mem.total / Math.pow(1024, 3)).toFixed(
    2
  )} GB`;

  return (
    <Fragment>
      <Title order={2}>System Info</Title>
      <Paper className={classes.container} withBorder>
        <Box className={classes.info_container}>
          <Title order={3}>Processor</Title>
          <Text className={classes.info_value}>
            {data.cpu.vendor} {data.cpu.brand}
          </Text>
          <Text className={classes.info_value}>
            {data.cpu.physicalCores} cores / {data.cpu.cores} threads
          </Text>
        </Box>
        <Box className={classes.info_container}>
          <Title order={3}>Memory</Title>
          <SemiCircleProgress
            size={256}
            thickness={20}
            filledSegmentColor={getSegmentColor(memoryPercentage)}
            value={memoryPercentage}
            label={`${memoryFormattedUsage} of ${memoryFormattedTotal}`}
            mb="xl"
          />
        </Box>
        <Box className={classes.info_container}>
          <Title order={3}>Storage</Title>
          <SemiCircleProgress
            size={256}
            thickness={20}
            filledSegmentColor={getSegmentColor(storagePercentage)}
            value={storagePercentage}
            label={`${storageFormattedUsage} of ${storageFormattedTotal}`}
            mb="xl"
          />
        </Box>
      </Paper>
    </Fragment>
  );
}
