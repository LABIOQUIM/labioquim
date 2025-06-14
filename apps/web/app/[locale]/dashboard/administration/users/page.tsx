import { Title } from "@mantine/core";

import { AdministrationUserList } from "@/components/Administration/Users/UserList";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

export default function Page() {
  return (
    <PageLayout>
      <Title order={2}>Administration: Users</Title>
      <AdministrationUserList />
    </PageLayout>
  );
}
