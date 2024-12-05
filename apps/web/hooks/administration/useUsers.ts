import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getUsers } from "@/actions/administration/getUsers";

type Return = Awaited<ReturnType<typeof getUsers>>;

export function useUsers(
  queryText: string,
  take: number,
  page: number,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["users", queryText, take, page],
    queryFn: () => getUsers(queryText, take, page),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
