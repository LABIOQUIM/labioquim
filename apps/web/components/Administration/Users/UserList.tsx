"use client";
import { ReactNode } from "react";
import { Box, Table } from "@mantine/core";
import { USER_STATUS } from "database";

import { Loader } from "@/components/Loader/Loader";
import { useUsers } from "@/hooks/administration/useUsers";
import { usePagination } from "@/providers/Pagination";
import { dateFormat } from "@/utils/dateFormat";

import { BanUser } from "./BanUser";
import { ResendValidationEmail } from "./ResendValidationEmail";
import { UpdateUser } from "./UpdateUser";

import classes from "./UserList.module.css";

export function AdministrationUserList() {
  const { page, take, queryText, queryStatus } = usePagination();
  const { data } = useUsers(queryText, take, page, queryStatus as USER_STATUS);

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
            <Th>Full name</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Created at</Th>
            <Th>Actions</Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data
            .sort((a, b) => (a.userName < b.userName ? -1 : 1))
            .map((item) => (
              <Table.Tr key={item.id}>
                <Td>
                  {item.firstName} {item.lastName}
                </Td>
                <Td>{item.userName}</Td>
                <Td>{item.email}</Td>
                <Td>{item.role}</Td>
                <Td>{item.status}</Td>
                <Td>{dateFormat(item.createdAt)}</Td>
                <Td>
                  <Box className={classes.actions_container}>
                    <ResendValidationEmail user={item} />
                    <UpdateUser user={item} />
                    <BanUser user={item} />
                  </Box>
                </Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
