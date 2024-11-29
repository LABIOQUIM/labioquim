"use client";
import { Fragment, ReactNode, useState } from "react";
import { Box, Table, TextInput } from "@mantine/core";
import { Highlight, useFuzzySearchList } from "@nozbe/microfuzz/react";

import { CenteredLoader } from "@/components/Loader/CenteredLoader";
import { useUsers } from "@/hooks/administration/useUsers";
import { dateFormat } from "@/utils/dateFormat";

import { BanUser } from "./BanUser";
import { UpdateUser } from "./UpdateUser";

import classes from "./UserList.module.css";

export function AdministrationUserList() {
  const [queryText, setQueryText] = useState("");
  const { data, isLoading } = useUsers();
  const list =
    data && data !== "unauthenticated" && data !== "unauthorized" ? data : [];

  const filteredList = useFuzzySearchList({
    list,
    queryText,
    strategy: "smart",
    getText: (item) => [
      item.email,
      item.firstName,
      item.lastName,
      item.userName,
    ],
    mapResultItem: ({
      item,
      matches: [emailRanges, firstNameRanges, lastNameRanges, userNameRanges],
    }) => ({
      item,
      emailRanges,
      firstNameRanges,
      lastNameRanges,
      userNameRanges,
    }),
  });

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
    <Table.Td className={classes.td} title={String(children)}>
      {children}
    </Table.Td>
  );

  return (
    <Fragment>
      <TextInput
        label="Search"
        placeholder="Search by username, email, name"
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
      />
      <Box className={classes.container}>
        <Table
          highlightOnHover
          stickyHeader
          striped
          classNames={{
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
            {filteredList
              .sort((a, b) => (a.item.userName < b.item.userName ? -1 : 1))
              .map(
                ({
                  item,
                  emailRanges,
                  firstNameRanges,
                  lastNameRanges,
                  userNameRanges,
                }) => (
                  <Table.Tr key={item.id}>
                    <Td>
                      <Highlight
                        ranges={firstNameRanges}
                        text={item.firstName}
                      />{" "}
                      <Highlight
                        ranges={lastNameRanges}
                        text={item.lastName || ""}
                      />
                    </Td>
                    <Td>
                      <Highlight ranges={userNameRanges} text={item.userName} />
                    </Td>
                    <Td>
                      <Highlight ranges={emailRanges} text={item.email} />
                    </Td>
                    <Td>{item.role}</Td>
                    <Td>{item.status}</Td>
                    <Td>{dateFormat(item.createdAt)}</Td>
                    <Td>
                      <Box className={classes.actions_container}>
                        <UpdateUser user={item} />
                        <BanUser user={item} />
                      </Box>
                    </Td>
                  </Table.Tr>
                )
              )}
          </Table.Tbody>
        </Table>
      </Box>
    </Fragment>
  );
}
