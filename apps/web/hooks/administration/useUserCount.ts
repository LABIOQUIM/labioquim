import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getUserCount } from "@/actions/administration/getUserCount";

type Return = Awaited<ReturnType<typeof getUserCount>>;

export function useUserCount(
  queryText?: string,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["user-count", queryText],
    queryFn: () => getUserCount(queryText),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
