"use client";
import { useCallback } from "react";

import { useAuth } from "./useAuth";

export function useReloadAuth() {
  const { refetch: reloadAuth } = useAuth();

  const reload = useCallback(async () => {
    await reloadAuth();
  }, [reloadAuth]);

  return reload;
}
