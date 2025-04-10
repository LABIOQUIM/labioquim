import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { USER_STATUS } from "database";

import { getUsers } from "@/actions/administration/getUsers";

type Return = Awaited<ReturnType<typeof getUsers>>;

export function useUsers(
  queryText: string,
  take: number,
  page: number,
  queryStatus?: USER_STATUS,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["users", queryText, take, page, queryStatus],
    queryFn: () => getUsers(queryText, take, page, queryStatus),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
