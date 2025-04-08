"use client";
import { ReactNode } from "react";
import { Box, Table, Text } from "@mantine/core";

import { Loader } from "@/components/Loader/Loader";
import { useSimulations } from "@/hooks/administration/useSimulations";
import { usePagination } from "@/providers/Pagination";
import { dateFormat } from "@/utils/dateFormat";

import classes from "./SimulationManagerList.module.css";

export function SimulationManagerList() {
  const { page, take, queryText } = usePagination();
  const { data } = useSimulations(queryText, take, page);

  if (!data || data === "unauthenticated" || data === "unauthorized") {
    return (
      <Box className={classes.loading_container}>
        <Loader />
      </Box>
    );
  }

  const Th = ({ children }: { children: ReactNode }) => (
    <Table.Th style={{ textWrap: "nowrap" }}>{children}</Table.Th>
  );

  const Td = ({ children }: { children: ReactNode }) => (
    <Table.Td className={classes.td} title={String(children)}>
      {children}
    </Table.Td>
  );

  return (
    <Box className={classes.container}>
      <Table
        highlightOnHover
        striped
        classNames={{
          table: classes.table,
          tbody: classes.table,
          tr: classes.tr,
        }}
        verticalSpacing="xs"
        withRowBorders
        withTableBorder
      >
        <Table.Thead>
          <Table.Tr>
            <Th>User</Th>
            <Th>Molecule name</Th>
            <Th>Ligand ITP name</Th>
            <Th>Ligand PDB name</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Started at</Th>
            <Th>Ended at</Th>
            <Th>Created at</Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item) => {
            let name = item.user.firstName;

            if (item.user.lastName) {
              name += ` ${item.user.lastName}`;
            }

            return (
              <Table.Tr key={item.id}>
                <Td>
                  {item.user.userName} ({name})
                </Td>
                <Td>{item.moleculeName}</Td>
                <Td>{item.ligandITPName}</Td>
                <Td>{item.ligandPDBName}</Td>
                <Td>{item.type.toLocaleUpperCase()}</Td>
                <Td>
                  <Text className={classes[item.status.toLocaleLowerCase()]}>
                    {item.status}
                  </Text>
                </Td>
                <Td>{dateFormat(item.startedAt)}</Td>
                <Td>{dateFormat(item.endedAt)}</Td>
                <Td>{dateFormat(item.createdAt)}</Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
