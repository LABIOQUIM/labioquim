"use client";
import { Box, Pagination, Text } from "@mantine/core";

import { useUserAdmin } from "@/app/[locale]/administration/users/UserAdmin";
import { useUserCount } from "@/hooks/administration/useUserCount";

import classes from "./UserListPagination.module.css";

export function AdministrationUserListPagination() {
  const { take, page, updatePage, queryText } = useUserAdmin();
  const { data } = useUserCount(queryText);

  const userCount =
    data && data !== "unauthenticated" && data !== "unauthorized" ? data : 0;

  const startingRow = (page - 1) * take + 1;
  const endingRow = page * take <= userCount ? page * take : userCount;

  return (
    <Box className={classes.container}>
      <Text>
        Showing {startingRow} to {endingRow} of {userCount}
      </Text>
      <Pagination
        value={page}
        total={Math.ceil(userCount / take)}
        boundaries={1}
        onChange={updatePage}
      />
    </Box>
  );
}
