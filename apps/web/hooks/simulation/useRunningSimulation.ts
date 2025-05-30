import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import {
  getRunningSimulation,
  RunningSimulation,
} from "@/actions/simulation/getRunningSimulation";

export function useRunningSimulation(
  options?: UseQueryOptions<ActionResponse<RunningSimulation>, unknown>
): UseQueryResult<ActionResponse<RunningSimulation>, unknown> {
  return useQuery({
    queryKey: ["running-simulation"],
    queryFn: () => getRunningSimulation(),
    enabled: false,
    ...options,
  });
}
