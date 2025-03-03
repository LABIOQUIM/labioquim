"use client";

import { TextInput } from "@mantine/core";

import { usePagination } from "@/providers/Pagination";

export function AdministrationUserListSearch() {
  const { queryText, setQueryText } = usePagination();

  return (
    <TextInput
      label="Search"
      placeholder="Search by username, email, name"
      value={queryText}
      onChange={(e) => setQueryText(e.target.value)}
    />
  );
}
