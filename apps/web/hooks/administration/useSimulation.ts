import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getSimulation } from "@/actions/administration/getSimulation";

type Return = Awaited<ReturnType<typeof getSimulation>>;

export function useSimulation(
  id: string,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["simulation", id],
    enabled: false,
    queryFn: () => getSimulation(id),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
