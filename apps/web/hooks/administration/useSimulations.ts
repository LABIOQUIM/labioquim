import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getSimulations } from "@/actions/administration/getSimulations";

type Return = Awaited<ReturnType<typeof getSimulations>>;

export function useSimulations(
  queryText: string,
  take: number,
  page: number,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["simulations", queryText, take, page],
    queryFn: () => getSimulations(queryText, take, page),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
