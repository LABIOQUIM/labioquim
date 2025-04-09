import { Box, Card, Group, SimpleGrid, Text, Title } from "@mantine/core";
import {
  IconBlendMode,
  IconChartDots,
  IconMicroscope,
} from "@tabler/icons-react";
import Image from "next/image";

import FIOCRUZROLogo from "@/assets/fiocruz-ro-white.png";
import FIOCRUZLogo from "@/assets/fiocruz-white.png";
import LABIOQUIMLogo from "@/assets/logo_transparent.svg";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";
import { Logo } from "@/components/Logo";

import classes from "./page.module.css";

const applications = [
  {
    title: "Visual Dynamics",
    description:
      "Web-based tool simplifying and accelerating molecular dynamics (MD) simulations using GROMACS.",
    icon: IconBlendMode,
  },
  {
    title: "PlasmoQSAR",
    description:
      "A tool to calculate the pEC50 value (and EC50%) against Plasmodium Falciparum that causes malaria.",
    icon: IconChartDots,
  },
  {
    title: "PlasmoIA",
    description:
      "AI-powered platform for detecting Plasmodium Vivax in images of malaria laboratorial exams.",
    icon: IconMicroscope,
  },
];

const backing = [
  {
    title: "LABIOQUIM",
    logo: LABIOQUIMLogo,
  },
  {
    title: "FIOCRUZ",
    logo: FIOCRUZLogo,
  },
  {
    title: "FIOCRUZ RO",
    logo: FIOCRUZROLogo,
  },
  // {
  //   title: "UFCSPA",
  //   logo: UFCSPALogo,
  // },
];

export default async function HomePage() {
  return (
    <PageLayout>
      <Box className={classes.container}>
        <Logo size="large" />
        <Text ta="center">
          The Bioinformatics and Medicinal Chemistry Laboratory (LABIOQUIM) at
          Fiocruz Rondônia is made up of an interdisciplinary group of
          researchers from different areas of natural knowledge: physics,
          chemistry, biology, computer science and biochemistry.
        </Text>
      </Box>

      <Title order={2} ta="center" mb="sm">
        Our Developed Applications
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {applications.map((app) => (
          <Card key={app.title} shadow="sm" padding="md" radius="md" withBorder>
            <Group align="center" p="apart" mb="xs">
              <app.icon size={30} stroke={1.5} />
              <Text fw={700} size="lg">
                {app.title}
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              {app.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      <Title order={2} ta="center" mb="sm">
        Backing
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {backing.map((backer) => (
          <Image
            alt={backer.title}
            className={classes.backerImage}
            key={backer.title}
            src={backer.logo}
          />
        ))}
      </SimpleGrid>
    </PageLayout>
  );
}
