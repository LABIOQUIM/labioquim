import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getUserFileTree } from "@/actions/administration/getUserFileTree";

type Return = Awaited<ReturnType<typeof getUserFileTree>>;

export function useUserFileTree(
  userName: string,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["user-tree", userName],
    queryFn: () => getUserFileTree(userName),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
