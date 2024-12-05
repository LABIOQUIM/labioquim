"use client";

import { TextInput } from "@mantine/core";

import { useUserAdmin } from "@/app/[locale]/administration/users/UserAdmin";

export function AdministrationUserListSearch() {
  const { queryText, updateQueryText } = useUserAdmin();

  return (
    <TextInput
      label="Search"
      placeholder="Search by username, email, name"
      value={queryText}
      onChange={(e) => updateQueryText(e.target.value)}
    />
  );
}
