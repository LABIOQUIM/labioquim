"use client";
import { Box, Pagination, Text } from "@mantine/core";
import { USER_STATUS } from "database";

import { useUserCount } from "@/hooks/administration/useUserCount";
import { usePagination } from "@/providers/Pagination";

import classes from "./UserListPagination.module.css";

export function AdministrationUserListPagination() {
  const { take, page, setPage, queryText, queryStatus } = usePagination();
  const { data } = useUserCount(queryText, queryStatus as USER_STATUS);

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
        onChange={setPage}
      />
    </Box>
  );
}
