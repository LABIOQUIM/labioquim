"use client";
import { Box, Pagination, Text } from "@mantine/core";

import { useSimulationsCount } from "@/hooks/administration/useSimulationsCount";
import { usePagination } from "@/providers/Pagination";

import classes from "./SimulationManagerPagination.module.css";

export function SimulationManagerPagination() {
  const { take, page, setPage, queryText } = usePagination();
  const { data } = useSimulationsCount(queryText);

  const simulationsCount =
    data && data !== "unauthenticated" && data !== "unauthorized" ? data : 0;

  const startingRow = (page - 1) * take + 1;
  const endingRow =
    page * take <= simulationsCount ? page * take : simulationsCount;

  return (
    <Box className={classes.container}>
      <Text>
        Showing {startingRow} to {endingRow} of {simulationsCount}
      </Text>
      <Pagination
        value={page}
        total={Math.ceil(simulationsCount / take)}
        boundaries={1}
        onChange={setPage}
      />
    </Box>
  );
}
