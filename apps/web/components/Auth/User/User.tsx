import { useCallback } from "react";
import { ActionIcon, Avatar, Box, Group, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { invalidateAuth } from "@/actions/auth/invalidateAuth";
import { useAuth } from "@/hooks/auth/useAuth";
import { useReloadAuth } from "@/hooks/auth/useReloadAuth";

import classes from "./User.module.css";

export function User() {
  const { data } = useAuth();
  const reload = useReloadAuth();
  const router = useRouter();

  const onLogout = useCallback(() => {
    invalidateAuth().then(() => {
      reload().then(() => router.push("/"));
    });
  }, [reload, router]);

  if (!data || !data.session || !data.user) {
    return null;
  }

  const userFullName = `${data.user.firstName} ${data.user.lastName ?? ""}`;

  return (
    <Box className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <Box style={{ flex: 1 }}>
          <Text lineClamp={1} size="sm" fw={500}>
            {userFullName.trim()}
          </Text>

          <Text lineClamp={1} c="dimmed" size="xs">
            {data.user.email}
          </Text>
        </Box>

        <ActionIcon color="red" onClick={onLogout} size="lg" variant="light">
          <IconLogout size={18} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
