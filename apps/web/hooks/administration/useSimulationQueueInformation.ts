import { useQuery } from "@tanstack/react-query";

import { getSimulationQueueInfo } from "@/actions/administration/getSimulationQueueInfo";

export function useSimulationQueueInformation() {
  return useQuery({
    queryKey: ["simulation-queue-information"],
    queryFn: () => getSimulationQueueInfo(),
    refetchInterval: 10 * 1000,
    staleTime: 9 * 1000,
  });
}
