"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  isMobile?: boolean;

  queryText: string;
  updateQueryText: Dispatch<SetStateAction<string>>;

  page: number;
  updatePage: Dispatch<SetStateAction<number>>;

  take: number;
}

const UserAdminContext = createContext<Props>({
  page: 0,
  queryText: "",
  take: 0,
  updatePage() {},
  updateQueryText() {},
});

export function useUserAdmin() {
  return useContext(UserAdminContext);
}

export function UserAdminProvider({ children }: PropsWithChildren) {
  const isMobile = useMediaQuery("(max-width: 48em)");
  const [page, updatePage] = useState(1);
  const [queryText, updateQueryText] = useState("");

  const value = useMemo(
    () => ({
      take: isMobile ? 6 : 8,

      page,
      updatePage,

      queryText,
      updateQueryText,

      isMobile,
    }),
    [page, queryText, isMobile]
  );

  return (
    <UserAdminContext.Provider value={value}>
      {children}
    </UserAdminContext.Provider>
  );
}
