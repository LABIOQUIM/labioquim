"use client";
import { useCallback, useState } from "react";
import { SegmentedControl } from "@mantine/core";

import { updateSystemMode } from "@/actions/utils/updateSystemMode";
import { useSettings } from "@/hooks/utils/useSettings";

interface Props {
  systemId: string;
}

export function SystemMode({ systemId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { data, refetch } = useSettings(systemId);

  const doUpdate = useCallback(
    async (systemMode: string) => {
      setIsLoading(true);
      const response = await updateSystemMode(systemId, systemMode);

      if (response === "success") {
        await refetch();
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    },
    [refetch, systemId]
  );

  if (!data || data === "unauthenticated" || data === "error") {
    return null;
  }

  return (
    <SegmentedControl
      disabled={isLoading}
      value={data.systemMode}
      onChange={doUpdate}
      w="fit-content"
      data={[
        { label: "Active", value: "ACTIVE" },
        { label: "Maintenance", value: "MAINTENANCE" },
        { label: "Down", value: "DOWN" },
      ]}
    />
  );
}
