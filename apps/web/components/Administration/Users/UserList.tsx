"use client";
import { ReactNode } from "react";
import { Box, Table } from "@mantine/core";

import { CenteredLoader } from "@/components/Loader/CenteredLoader";
import { useUsers } from "@/hooks/administration/useUsers";
import { dateFormat } from "@/utils/dateFormat";

import { UpdateUser } from "./UpdateUser";

import classes from "./UserList.module.css";

export function AdministrationUserList() {
  const { data, isLoading } = useUsers();

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (!data || data === "unauthenticated" || data === "unauthorized") {
    return null;
  }

  const Th = ({ children }: { children: ReactNode }) => (
    <Table.Th style={{ textWrap: "nowrap" }}>{children}</Table.Th>
  );

  const Td = ({ children }: { children: ReactNode }) => (
    <Table.Td style={{ textWrap: "nowrap" }}>{children}</Table.Td>
  );

  return (
    <Box className={classes.container}>
      <Table
        highlightOnHover
        stickyHeader
        striped
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
            .map((element) => (
              <Table.Tr key={element.id}>
                <Td>
                  {element.firstName} {element.lastName}
                </Td>
                <Td>{element.userName}</Td>
                <Td>{element.email}</Td>
                <Td>{element.role}</Td>
                <Td>{element.status}</Td>
                <Td>{dateFormat(element.createdAt)}</Td>
                <Td>
                  <Box>
                    <UpdateUser user={element} />
                  </Box>
                </Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
