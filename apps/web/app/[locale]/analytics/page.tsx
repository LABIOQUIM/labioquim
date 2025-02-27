import { AspectRatio, Title } from "@mantine/core";

import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import classes from "./page.module.css";

export default function AnalyticsPage() {
  return (
    <PageLayout>
      <Title order={1}>Analytics</Title>
      <AspectRatio ratio={16 / 9}>
        <iframe
          className={classes.analyticsContainer}
          src="https://lookerstudio.google.com/embed/reporting/c52ec58d-916c-4291-b5db-10f6e9df6e85/page/fhpXD"
          title="LABIOQUIM Platform Analytics"
          style={{ border: 0 }}
        />
      </AspectRatio>
    </PageLayout>
  );
}
