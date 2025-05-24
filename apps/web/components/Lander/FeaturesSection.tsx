import React from "react";
import { Box, SimpleGrid } from "@mantine/core";
import {
  IconChartArrowsVertical,
  IconCloudComputing,
  IconCode,
  IconEye,
  IconUsers,
} from "@tabler/icons-react";

import { FeatureCard } from "./FeatureCard";

import styles from "./FeaturesSection.module.css";

const featuresData = [
  {
    icon: <IconChartArrowsVertical size={32} />,
    title: "Molecular Dynamics on the Web",
    description:
      "Run GROMACS-powered simulations directly in your browser, no installation required.",
  },
  {
    icon: <IconEye size={32} />,
    title: "Pre generated graphics",
    description:
      "Download pre-generated graphics of your MD simulations in a single click.",
  },
  {
    icon: <IconCloudComputing size={32} />,
    title: "Web-Based & Accessible",
    description:
      "No installation needed. Access Visual Dynamics from any modern web browser.",
  },
  {
    icon: <IconCode size={32} />,
    title: "Open Source Platform",
    description:
      "Built on open standards and contributed by the scientific community. Hosted by Fiocruz.",
  },
  {
    icon: <IconUsers size={32} />,
    title: "For Researchers & Students",
    description:
      "An intuitive tool designed for both seasoned researchers and students learning MD.",
  },
];

export function LanderFeaturesSection() {
  return (
    <Box component="section" className={styles.featuresSection} id="features">
      <div className={styles.featuresContainer}>
        <h2 className={styles.sectionTitle}>Core Capabilities</h2>
        {/* Using SimpleGrid for layout. Its cols and spacing props are fine. */}
        <SimpleGrid
          className={styles.grid}
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: "lg", sm: "xl" }} // Mantine spacing tokens
        >
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </SimpleGrid>
      </div>
    </Box>
  );
}
