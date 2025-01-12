"use client";
import { useState } from "react";
import { ActionIcon, Box, Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { render } from "@react-email/components";
import { IconCancel, IconMailForward } from "@tabler/icons-react";
import { User } from "database";

import { createUserValidation } from "@/actions/administration/createUserValidation";
import { sendMail } from "@/actions/utils/sendMail";
import { Alert } from "@/components/Alerts/Alert";
import AccountActivationEmail from "@/emails/account/Activation";

import classes from "./UpdateUser.module.css";

interface Props {
  user: User;
}

export function ResendValidationEmail({ user }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<FormSubmissionStatus>();

  async function doResend() {
    setStatus({ status: "loading" });
    console.log(user);
    const validationId = await createUserValidation(user.id);

    console.log(validationId);

    if (
      !validationId ||
      validationId === "failure" ||
      validationId === "unauthenticated" ||
      validationId === "unauthorized"
    ) {
      return;
    }

    const html = await render(
      <AccountActivationEmail
        email={user.email}
        firstName={user.firstName}
        validationURL={`${window.location.protocol}//${window.location.host}/account/email-validation/${validationId}`}
      />
    );

    const result = await sendMail(
      user.email,
      html,
      "[LABIOQUIM] Your account activation link."
    );

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
    }
  }

  function onClose() {
    close();
    setStatus(undefined);
  }

  let userIdentification = `${user.userName} (${user.firstName}`;

  if (user.lastName) {
    userIdentification += ` ${user.lastName}`;
  }

  userIdentification += ")";

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
        title="Resend Validation Email"
      >
        {status && status.status !== "loading" && <Alert status={status} />}
        <Box className={classes.formContainer}>
          <Text>
            Are you sure you want to resend the activation email to the user{" "}
            <b>{userIdentification}</b>?
          </Text>
          <Box className={classes.row_container}>
            <Button
              color="red"
              leftSection={<IconCancel />}
              onClick={onClose}
              type="button"
              variant="light"
            >
              Cancel
            </Button>
            <Button
              color="teal"
              leftSection={<IconMailForward />}
              onClick={doResend}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>

      <ActionIcon
        title="Resend Validation Email"
        color="teal"
        variant="light"
        size="lg"
        onClick={open}
      >
        <IconMailForward />
      </ActionIcon>
    </>
  );
}
