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
import { SIMULATION_STATUS, USER_STATUS } from "database";

interface Props {
  queryText: string;
  setQueryText: Dispatch<SetStateAction<string>>;
  queryStatus: SIMULATION_STATUS | USER_STATUS | undefined;
  setQueryStatus: Dispatch<
    SetStateAction<SIMULATION_STATUS | USER_STATUS | undefined>
  >;
  take: number;
  setTake: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Context = createContext<Props>({
  queryText: "",
  queryStatus: undefined,
  page: 1,
  take: 10,
  setQueryText() {},
  setQueryStatus() {},
  setPage() {},
  setTake() {},
});

export function usePagination() {
  return useContext(Context);
}

interface ProviderProps {
  defaultTake?: number;
}

export function PaginationProvider({
  children,
  defaultTake = 10,
}: PropsWithChildren<ProviderProps>) {
  const [queryText, setQueryText] = useState("");
  const [queryStatus, setQueryStatus] = useState<
    SIMULATION_STATUS | USER_STATUS | undefined
  >(undefined);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(defaultTake);

  const value = useMemo(
    () => ({
      queryText,
      setQueryText,
      queryStatus,
      setQueryStatus,
      page,
      setPage,
      take,
      setTake,
    }),
    [queryText, queryStatus, page, take]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
