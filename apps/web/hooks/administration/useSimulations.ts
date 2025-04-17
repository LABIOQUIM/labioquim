import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  type MRT_ColumnFiltersState as MRTColumnFiltersState,
  type MRT_PaginationState as MRTPaginationState,
  type MRT_SortingState as MRTSortingState,
} from "mantine-react-table";

import { getSimulations } from "@/actions/administration/getSimulations";

type Return = Awaited<ReturnType<typeof getSimulations>>;

export function useSimulations(
  columnFilters: MRTColumnFiltersState,
  sorting: MRTSortingState,
  pagination: MRTPaginationState,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: [
      "simulations",
      JSON.stringify(columnFilters),
      JSON.stringify(sorting),
      JSON.stringify(pagination),
    ],
    queryFn: () => getSimulations(columnFilters, sorting, pagination),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
