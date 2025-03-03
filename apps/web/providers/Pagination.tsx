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

interface Props {
  queryText: string;
  setQueryText: Dispatch<SetStateAction<string>>;
  take: number;
  setTake: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Context = createContext<Props>({
  queryText: "",
  page: 1,
  take: 10,
  setPage() {},
  setQueryText() {},
  setTake() {},
});

export function usePagination() {
  return useContext(Context);
}

export function PaginationProvider({ children }: PropsWithChildren) {
  const [queryText, setQueryText] = useState("");
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);

  const value = useMemo(
    () => ({
      queryText,
      setQueryText,
      page,
      setPage,
      take,
      setTake,
    }),
    [queryText, page, take]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
