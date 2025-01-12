"use client";
import { useCallback, useState } from "react";
import { SegmentedControl } from "@mantine/core";

import { updateSystemMode } from "@/actions/utils/updateSystemMode";
import { useAllSettings } from "@/hooks/utils/useAllSettings";
import { useSettings } from "@/hooks/utils/useSettings";

interface Props {
  systemId: string;
}

export function SystemMode({ systemId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { data, refetch: refetchSettings } = useSettings(systemId);
  const { refetch: refetchAllSettings } = useAllSettings();

  const doUpdate = useCallback(
    async (systemMode: string) => {
      setIsLoading(true);
      const response = await updateSystemMode(systemId, systemMode);

      if (response === "success") {
        await refetchSettings();
        await refetchAllSettings();
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    },
    [refetchSettings, refetchAllSettings, systemId]
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
