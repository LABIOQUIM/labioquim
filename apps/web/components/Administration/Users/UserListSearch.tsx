"use client";
import { FormEvent, useState } from "react";
import { Box, Button, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { USER_STATUS } from "database";

import { usePagination } from "@/providers/Pagination";

import classes from "./UserListSearch.module.css";

export function AdministrationUserListSearch() {
  const [tempQuery, setTempQuery] = useState("");
  const [tempStatus, setTempStatus] = useState<string | null>("ALL");
  const { setQueryText, setQueryStatus, setPage } = usePagination();

  const doSearch = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setQueryText(tempQuery);
    if (tempStatus && tempStatus !== "ALL") {
      setQueryStatus(tempStatus as USER_STATUS);
    } else {
      setQueryStatus(undefined);
    }
    setPage(1);
  };

  return (
    <Box component="form" onSubmit={doSearch} className={classes.container}>
      <TextInput
        className={classes.input}
        label="Search"
        placeholder="Search by username, email, name"
        value={tempQuery}
        onChange={(e) => setTempQuery(e.target.value)}
      />
      <Select
        label="Status"
        value={tempStatus}
        onChange={(e) => setTempStatus(e)}
        data={[
          { label: "All", value: "ALL" },
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
          {
            label: "Awaiting Email Validation",
            value: "AWAITING_EMAIL_VALIDATION",
          },
          {
            label: "Disabled by an Administrator",
            value: "DISABLED_BY_ADMINISTRATOR",
          },
        ]}
      />
      <Button
        className={classes.button}
        leftSection={<IconSearch />}
        type="submit"
      >
        Search
      </Button>
    </Box>
  );
}
