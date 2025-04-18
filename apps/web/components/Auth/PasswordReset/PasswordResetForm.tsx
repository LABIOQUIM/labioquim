"use client";

import { useState } from "react";
import { Box, Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { resetPassword } from "@/actions/auth/resetPassword";
import { Alert } from "@/components/Alerts/Alert";
import { Loader } from "@/components/Loader/Loader";
import { usePasswordReset } from "@/hooks/auth/usePasswordReset";
import { normalizeString } from "@/utils/normalizeString";

import classes from "./PasswordResetForm.module.css";

interface Props {
  resetId: string;
}

interface FormInputs {
  password: string;
}

export function PasswordResetForm({ resetId }: Props) {
  const router = useRouter();
  const { data, isLoading } = usePasswordReset(resetId);
  const [status, setStatus] = useState<FormSubmissionStatus>();

  const { getInputProps, onSubmit } = useForm<FormInputs>({
    initialValues: {
      password: "",
    },
    validate: {
      password: (value) =>
        normalizeString(value).length < 5
          ? "The password can't be less than 6 characters"
          : null,
    },
  });

  function doReset({ password }: FormInputs) {
    setStatus({ status: "loading" });
    resetPassword(resetId, password).then((res) => {
      if (res === "success") {
        notifications.show({
          title: "Your password has been reset.",
          message: "Your password has been reset and you can now login.",
          color: "green",
        });
        router.replace("/");
      } else if (res === "no-reset") {
        notifications.show({
          title: "This reset code does not exist.",
          message: "This password reset will not work.",
          color: "orange",
        });
      } else {
        notifications.show({
          title: "Something failed.",
          message: "Try another reset code or contact the administrators.",
          color: "red",
        });
      }
    });
    //
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data === "no-reset") {
    return (
      <Box>
        <Text>No password reset found</Text>
      </Box>
    );
  }

  if (data.used || !data.usable || dayjs(data.validUntil).isAfter(dayjs())) {
    return (
      <Box component="form" className={classes.formContainer}>
        <Alert
          status={{
            status: "warning",
            title: "This reset code has expired.",
            message: "You will need to request a new reset code.",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      className={classes.formContainer}
      onSubmit={onSubmit(doReset)}
    >
      <TextInput
        data-autofocus
        disabled={status?.status === "loading"}
        label="New Password"
        withAsterisk
        type="password"
        {...getInputProps("password")}
      />

      <Button loading={status?.status === "loading"} type="submit">
        Reset
      </Button>
    </Box>
  );
}
