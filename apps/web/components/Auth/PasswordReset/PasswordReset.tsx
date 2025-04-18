import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  rem,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { render } from "@react-email/components";
import { IconChevronRight, IconUserQuestion } from "@tabler/icons-react";

import { createPasswordReset } from "@/actions/auth/createPasswordReset";
import { sendMail } from "@/actions/utils/sendMail";
import { Alert } from "@/components/Alerts/Alert";
import AccountPasswordResetEmail from "@/emails/account/PasswordReset";
import { normalizeString } from "@/utils/normalizeString";

import classes from "./PasswordReset.module.css";

interface FormInputs {
  userName: string;
}

export function PasswordReset() {
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<FormSubmissionStatus>();
  const { getInputProps, onSubmit, reset } = useForm<FormInputs>({
    initialValues: {
      userName: "",
    },
    validate: {
      userName: (value) =>
        normalizeString(value).length < 4
          ? "Your email and username both have more than 3 characters"
          : null,
    },
  });

  async function doSentResetLink({ userName }: FormInputs) {
    setStatus({ status: "loading" });
    const res = await createPasswordReset(userName);

    if (res === "no-user") {
      setStatus({
        status: "warning",
        title: `Account not found.`,
        message:
          "The email or username you entered is not registered at Visual Dynamics",
      });
      return;
    }

    const html = await render(
      <AccountPasswordResetEmail
        email={res.email}
        firstName={res.firstName}
        resetURL={`${window.location.protocol}//${window.location.host}/account/password-reset/${res.resetId}`}
      />
    );

    const result = await sendMail(
      res.email,
      html,
      "[Visual Dynamics] Your password reset link."
    );
    if (result !== "success") {
      setStatus({
        status: "warning",
        title: `Something went wrong and an email couldn't be sent to you.`,
        message:
          "Send an email to visualdynamics@fiocruz.br detailing this to proceed.",
      });
    } else {
      setStatus({
        status: "success",
        title: "Your password reset link has been sent.",
      });
    }
  }

  function onClose() {
    close();
    reset();
    setStatus(undefined);
  }

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
        title="Password Reset"
      >
        <Box
          component="form"
          className={classes.formContainer}
          onSubmit={onSubmit(doSentResetLink)}
        >
          {status && status.status !== "loading" && <Alert status={status} />}
          <TextInput
            data-autofocus
            disabled={status?.status === "loading"}
            label="Email"
            withAsterisk
            {...getInputProps("userName")}
          />

          <Button loading={status?.status === "loading"} type="submit">
            Send Reset Link
          </Button>
        </Box>
      </Modal>

      <UnstyledButton className={classes.signin} onClick={open}>
        <Group>
          <Avatar radius="xl">
            <IconUserQuestion />
          </Avatar>

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Password Reset
            </Text>

            <Text c="dimmed" size="xs">
              Forgot your password? Just reset it.
            </Text>
          </div>

          <IconChevronRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        </Group>
      </UnstyledButton>
    </>
  );
}
