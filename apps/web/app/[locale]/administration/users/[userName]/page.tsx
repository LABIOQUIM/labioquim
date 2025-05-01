import { Title } from "@mantine/core";

import { AdministrationUserFileTree } from "@/components/Administration/Users/FileTree";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

interface Props {
  params: Promise<{ userName: string }>;
}

export default async function Page({ params }: Props) {
  const userName = (await params).userName;

  return (
    <PageLayout>
      <Title order={2}>Administration: Files for {userName}</Title>
      <AdministrationUserFileTree userName={userName} />
    </PageLayout>
  );
}
