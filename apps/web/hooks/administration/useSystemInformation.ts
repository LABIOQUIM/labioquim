import { useQuery } from "@tanstack/react-query";

import { getSimulationSystemInfo } from "@/actions/administration/getSimulationSystemInfo";

export function useSimulationSystemInformation() {
  return useQuery({
    queryKey: ["simulations-system-information"],
    queryFn: () => getSimulationSystemInfo(),
    refetchInterval: 10 * 1000,
    staleTime: 9 * 1000,
  });
}
