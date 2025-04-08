"use client";
import { FormEvent, useState } from "react";
import { Box, Button, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { usePagination } from "@/providers/Pagination";

import classes from "./UserListSearch.module.css";

export function AdministrationUserListSearch() {
  const [tempQuery, setTempQuery] = useState("");
  const { setQueryText } = usePagination();

  const doSearch = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setQueryText(tempQuery);
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
      <Button className={classes.button} leftSection={<IconSearch />}>
        Search
      </Button>
    </Box>
  );
}
