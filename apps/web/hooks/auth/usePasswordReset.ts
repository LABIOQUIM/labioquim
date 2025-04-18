import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { getPasswordReset } from "@/actions/auth/getPasswordReset";

type Return = Awaited<ReturnType<typeof getPasswordReset>>;

export function usePasswordReset(
  id: string,
  options?: UseQueryOptions<Return | null, unknown>
): UseQueryResult<Return | null, unknown> {
  return useQuery({
    queryKey: ["password-reset", id],
    queryFn: () => getPasswordReset(id),
    ...options,
  });
}
