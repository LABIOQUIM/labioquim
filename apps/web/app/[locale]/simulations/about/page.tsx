"use client";
import { Badge, Box, Card, Group, List, Text, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";

import VDBg from "@/assets/visualdynamics.png";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import classes from "./page.module.css";

export default function SimulationsAboutPage() {
  return (
    <PageLayout>
      <Title>About Visual Dynamics</Title>

      <Box className={classes.container}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              className={classes.image}
              src={VDBg}
              alt="Visual Dynamics Interface"
            />
          </Card.Section>

          <Group mt="md" mb="xs">
            <Text>Visual Dynamics: Simplified MD Simulations</Text>
            <Badge color="blue" variant="light" ml="auto">
              Open Source
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            Web-based tool simplifying and accelerating molecular dynamics (MD)
            simulations using GROMACS.
          </Text>

          <List mt="md" spacing="xs" size="sm" icon={<IconCheck size={12} />}>
            <List.Item>User-friendly graphical interface.</List.Item>
            <List.Item>
              Accessible from any device with a web browser.
            </List.Item>
            <List.Item>
              Ideal for learning and teaching MD simulations.
            </List.Item>
            <List.Item>Focus on protein-ligand simulations.</List.Item>
            <List.Item>Free and open source.</List.Item>
          </List>
        </Card>

        <Box className={classes.containerText}>
          <Text>
            Visual Dynamics is a web-based tool designed to democratize
            molecular dynamics (MD) simulations. By leveraging the power of
            GROMACS within an intuitive graphical interface, it eliminates the
            complexities of command-line usage and local software installations.
            This makes MD simulations accessible to a broader audience,
            including researchers, educators, and students, regardless of their
            computational expertise or access to high-performance computing
            resources.
          </Text>
          <Text>
            With a focus on protein-ligand interactions, a crucial aspect of
            drug discovery and biological research, Visual Dynamics simplifies
            the setup, execution, and analysis of these simulations. Key
            features include a user-friendly interface, browser-based
            accessibility, and a focus on educational applications. Being open
            source, it encourages community contributions and fosters a
            collaborative environment for advancing MD research and education.
          </Text>
        </Box>
      </Box>
    </PageLayout>
  );
}
