"use client";
import { FormEvent, useState } from "react";
import { Box, Button, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { usePagination } from "@/providers/Pagination";

import classes from "./SimulationManagerSearchBox.module.css";

export function SimulationManagerSearchBox() {
  const [tempQuery, setTempQuery] = useState("");
  const { setQueryText } = usePagination();

  const doSearch = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setQueryText(tempQuery);
  };

  return (
    <Box className={classes.container} component="form" onSubmit={doSearch}>
      <TextInput
        className={classes.input}
        label="Search"
        placeholder="Search by username, email, name"
        value={tempQuery}
        onChange={(e) => setTempQuery(e.target.value)}
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
