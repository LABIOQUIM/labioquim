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

import { getUsers } from "@/actions/administration/getUsers";

type Return = Awaited<ReturnType<typeof getUsers>>;

export function useUsers(
  columnFilters: MRTColumnFiltersState,
  sorting: MRTSortingState,
  pagination: MRTPaginationState,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: [
      "users",
      JSON.stringify(columnFilters),
      JSON.stringify(sorting),
      JSON.stringify(pagination),
    ],
    queryFn: () => getUsers(columnFilters, sorting, pagination),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
