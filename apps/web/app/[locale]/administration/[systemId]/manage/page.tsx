import { Box, Title } from "@mantine/core";
import dynamic from "next/dynamic";

import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import classes from "./page.module.css";

interface Props {
  params: Promise<{
    systemId: string;
  }>;
}

const getDynamicComponent = (systemId: string) =>
  dynamic(() => import(`@/components/Administration/Manage/${systemId}`), {
    loading: () => <p>Loading...</p>,
  });

export default async function AdminSystemManagePage({ params }: Props) {
  const systemId = (await params).systemId;

  const SystemManage = getDynamicComponent(systemId);

  return (
    <PageLayout>
      <Title>Manage {systemId.toUpperCase()}</Title>
      <Box className={classes.container}>
        <SystemManage />
      </Box>
    </PageLayout>
  );
}
