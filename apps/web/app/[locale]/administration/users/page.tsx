import { Box, Title } from "@mantine/core";

import { AdministrationUserList } from "@/components/Administration/Users/UserList";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import classes from "./page.module.css";

export default function Page() {
  return (
    <PageLayout>
      <Title order={2}>Administration: Users</Title>
      <Box className={classes.container}>
        <AdministrationUserList />
      </Box>
    </PageLayout>
  );
}
