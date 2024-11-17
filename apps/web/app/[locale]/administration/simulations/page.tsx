import { Box, Title } from "@mantine/core";

import { AdminSimulationQueueInfo } from "@/components/Administration/Simulations/QueueInfo";
import { AdminSimulationSystemInfo } from "@/components/Administration/Simulations/SystemInfo";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import classes from "./page.module.css";

export default function AdministrationSimulationsPage() {
  return (
    <PageLayout>
      <Title>Visual Dynamics Administration</Title>
      <Box className={classes.container}>
        <AdminSimulationQueueInfo />
        <AdminSimulationSystemInfo />
      </Box>
    </PageLayout>
  );
}
