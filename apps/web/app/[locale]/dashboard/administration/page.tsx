import { Box, Title } from "@mantine/core";

import { AdministrationNav } from "@/components/Administration/Nav";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import classes from "./page.module.css";

export default function AdministrationPage() {
  return (
    <PageLayout>
      <Title>Administration</Title>
      <Box className={classes.container}>
        <AdministrationNav />
      </Box>
    </PageLayout>
  );
}
