import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getUsers } from "@/actions/administration/getUsers";

type Return = Awaited<ReturnType<typeof getUsers>>;

export function useUsers(
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}
