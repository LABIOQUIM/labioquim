import { useQuery } from "@tanstack/react-query";

import { getAllSettings } from "@/actions/utils/getAllSettings";

export function useAllSettings() {
  return useQuery({
    queryKey: ["all-settings"],
    queryFn: () => getAllSettings(),
  });
}
