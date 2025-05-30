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
import { IconChevronRight } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";

import { login } from "@/actions/auth/login";
import { Alert } from "@/components/Alerts/Alert";
import { useReloadAuth } from "@/hooks/auth/useReloadAuth";
import { normalizeString } from "@/utils/normalizeString";

import classes from "./Login.module.css";

interface FormInputs {
  userName: string;
  password: string;
}

export function Login() {
  const reload = useReloadAuth();
  const searchParamDo = useSearchParams().get("do");
  const shouldShowLoginModal = searchParamDo === "login";
  const searchParamFrom = useSearchParams().get("from");
  const showFromEmailValidationAlert = searchParamFrom === "email-validation";
  const showUnauthenticatedAlert = searchParamFrom === "unauthenticated";
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<FormSubmissionStatus>();
  const { getInputProps, onSubmit, reset } = useForm<FormInputs>({
    initialValues: {
      userName: "",
      password: "",
    },
    validate: {
      userName: (value) =>
        normalizeString(value).length < 4
          ? "Your email and username both have more than 3 characters"
          : null,
      password: (value) =>
        normalizeString(value).length < 5
          ? "The password can't be less than 6 characters"
          : null,
    },
  });

  async function doLogin({ userName, password }: FormInputs) {
    setStatus({ status: "loading" });
    login(userName, password).then((res) => {
      if (res === "invalid-credentials") {
        setStatus({
          status: "warning",
          title: "Username or Password incorrect.",
        });
      } else if (res === "awaiting-activation") {
        setStatus({
          status: "warning",
          title:
            "This account isn't activated. Check your email inbox and spam.",
        });
      } else if (res === "inactive") {
        setStatus({
          status: "error",
          title: "This account has been disabled by an administrator",
        });
      } else if (res === "unknown-error") {
        setStatus({
          status: "error",
          title: "Something went wrong. Please report to the administrators.",
        });
      } else {
        setStatus({ status: "success", title: "You've been signed-in" });
        reload();
        close();
      }
    });
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
        opened={opened || shouldShowLoginModal}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="md"
        title="Login"
      >
        <Box
          component="form"
          className={classes.formContainer}
          onSubmit={onSubmit(doLogin)}
        >
          {showFromEmailValidationAlert && (
            <Alert
              status={{
                status: "info",
                title: "Your email has been validated",
                message: "Your can now login and use Visual Dynamics",
              }}
            />
          )}
          {showUnauthenticatedAlert && (
            <Alert
              status={{
                status: "info",
                title: "You're not authenticated.",
                message: "You must be logged in to use Visual Dynamics",
              }}
            />
          )}
          {status && status.status !== "loading" && <Alert status={status} />}
          <TextInput
            data-autofocus
            disabled={status?.status === "loading"}
            label="Username"
            withAsterisk
            {...getInputProps("userName")}
          />
          <TextInput
            disabled={status?.status === "loading"}
            label="Password"
            withAsterisk
            type="password"
            {...getInputProps("password")}
          />

          <Button loading={status?.status === "loading"} type="submit">
            Login
          </Button>
        </Box>
      </Modal>

      <UnstyledButton className={classes.signin} onClick={open}>
        <Group>
          <Avatar radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Login
            </Text>

            <Text c="dimmed" size="xs">
              You must be registered and logged in to use the system.
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
