import { Box, Title } from "@mantine/core";

import { AdministrationUserList } from "@/components/Administration/Users/UserList";
import { AdministrationUserListPagination } from "@/components/Administration/Users/UserListPagination";
import { AdministrationUserListSearch } from "@/components/Administration/Users/UserListSearch";
import { PageLayout } from "@/components/Layout/PageLayout/PageLayout";

import { UserAdminProvider } from "./UserAdmin";

import classes from "./page.module.css";

export default function Page() {
  return (
    <PageLayout>
      <Title order={2}>Administration: Users</Title>
      <Box className={classes.container}>
        <UserAdminProvider>
          <AdministrationUserListSearch />
          <AdministrationUserList />
          <AdministrationUserListPagination />
        </UserAdminProvider>
      </Box>
    </PageLayout>
  );
}
