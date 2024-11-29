"use client";
import { useState } from "react";
import { ActionIcon, Box, Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCancel, IconHammer, IconHammerOff } from "@tabler/icons-react";
import { User } from "database";

import { updateUser } from "@/actions/administration/updateUser";
import { Alert } from "@/components/Alert";
import { useUsers } from "@/hooks/administration/useUsers";

import classes from "./BanUser.module.css";

interface Props {
  user: User;
}

export function BanUser({ user }: Props) {
  const { refetch: refetchUsers } = useUsers();
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<FormSubmissionStatus>();

  async function doBan() {
    setStatus({ status: "loading" });
    const result = await updateUser(user, {
      status:
        user.status === "DISABLED_BY_ADMINISTRATOR"
          ? "ACTIVE"
          : "DISABLED_BY_ADMINISTRATOR",
    });

    if (result !== "success") {
      setStatus({
        status: "warning",
        title: `Something went wrong: ${result}`,
      });
    } else {
      setStatus({
        status: "success",
        title: `User ${user.userName} updated.`,
      });
      refetchUsers();
    }
  }

  function onClose() {
    close();
    setStatus(undefined);
  }

  const userIdentification = `${user.userName} (${user.firstName} ${user.lastName})`;

  const isBanned = user.status === "DISABLED_BY_ADMINISTRATOR";

  return (
    <>
      <Modal
        centered
        classNames={{
          title: classes.modalTitle,
        }}
        onClose={onClose}
        opened={opened}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="md"
        title="Ban User"
      >
        {status && status.status !== "loading" && <Alert status={status} />}
        <Box className={classes.container}>
          <Text>
            Are you sure you want to <b>{isBanned ? "unban" : "soft ban"}</b>{" "}
            the user <b>{userIdentification}</b>?
          </Text>
          <Box className={classes.row_container}>
            <Button
              color="gray"
              leftSection={<IconCancel />}
              onClick={onClose}
              type="button"
              variant="light"
            >
              Cancel
            </Button>
            <Button
              color={isBanned ? "grape" : "red"}
              leftSection={isBanned ? <IconHammerOff /> : <IconHammer />}
              onClick={doBan}
            >
              {isBanned ? "UNBAN" : "BAN"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <ActionIcon
        color={isBanned ? "grape" : "red"}
        variant="light"
        size="lg"
        title={isBanned ? "Unban User" : "Ban User"}
        onClick={open}
      >
        {isBanned ? <IconHammerOff /> : <IconHammer />}
      </ActionIcon>
    </>
  );
}
