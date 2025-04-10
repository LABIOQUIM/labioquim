import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { USER_STATUS } from "database";

import { getUserCount } from "@/actions/administration/getUserCount";

type Return = Awaited<ReturnType<typeof getUserCount>>;

export function useUserCount(
  queryText?: string,
  queryStatus?: USER_STATUS,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["user-count", queryText, queryStatus],
    queryFn: () => getUserCount(queryText, queryStatus),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
