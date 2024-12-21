import { useQuery } from "@tanstack/react-query";

import { getSettings } from "@/actions/utils/getSettings";

export function useSettings(systemId: string) {
  return useQuery({
    queryKey: ["settings", systemId],
    queryFn: () => getSettings(systemId),
  });
}
