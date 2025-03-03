import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getSimulationsCount } from "@/actions/administration/getSimulationsCount";

type Return = Awaited<ReturnType<typeof getSimulationsCount>>;

export function useSimulationsCount(
  queryText?: string,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["simulations-count", queryText],
    queryFn: () => getSimulationsCount(queryText),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
