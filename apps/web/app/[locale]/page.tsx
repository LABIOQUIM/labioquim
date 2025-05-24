import { SimpleGrid, Title } from "@mantine/core";
import Image from "next/image";

import FIOCRUZLogo from "@/assets/fiocruz.jpg";
import FIOCRUZROLogo from "@/assets/fiocruz-ro.png";
import LABIOQUIMLogo from "@/assets/labioquim.png";
import UFCSPALogo from "@/assets/ufcspa.png";
import { LanderFeaturesSection } from "@/components/Lander/FeaturesSection";
import { LanderHeroSection } from "@/components/Lander/HeroSection";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import classes from "./page.module.css";

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
  {
    title: "UFCSPA",
    logo: UFCSPALogo,
  },
];

export default async function HomePage() {
  return (
    <PageLayout>
      <LanderHeroSection />
      <LanderFeaturesSection />

      <Title order={2} className={classes.sectionTitle}>
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
