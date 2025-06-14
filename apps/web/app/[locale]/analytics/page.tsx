import { AspectRatio, Title } from "@mantine/core";

import { LanderCallToActionSection } from "@/components/Lander/CallToActionSection";
import { LanderLayout } from "@/components/Lander/Layout";

import classes from "./page.module.css";

export default function AnalyticsPage() {
  return (
    <LanderLayout>
      <Title order={1} className={classes.sectionTitle}>
        Analytics
      </Title>
      <AspectRatio ratio={16 / 9} className={classes.analyticsContainer}>
        <iframe
          className={classes.analyticsIframe}
          src="https://lookerstudio.google.com/embed/reporting/c52ec58d-916c-4291-b5db-10f6e9df6e85/page/fhpXD"
          title="LABIOQUIM Platform Analytics"
          style={{ border: 0 }}
        />
      </AspectRatio>
      <LanderCallToActionSection />
    </LanderLayout>
  );
}
