"use client";
import { ReactElement, useState } from "react";
import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { render } from "@react-email/components";

import { createUserValidation } from "@/actions/administration/createUserValidation";
import { register } from "@/actions/auth/register";
import { sendMail } from "@/actions/utils/sendMail";
import { Alert } from "@/components/Alerts/Alert";
import AccountActivationEmail from "@/emails/account/Activation";
import { normalizeString } from "@/utils/normalizeString";

import classes from "./Register.module.css";

export function Register(): ReactElement {
  const [status, setStatus] = useState<FormSubmissionStatus>();
  const { getInputProps, onSubmit } = useForm<RegisterFormInputs>({
    initialValues: {
      email: "",
      firstName: "",
      password: "",
      userName: "",
      lastName: "",
    },
    validate: {
      email: (value) => (value.length < 8 ? "Invalid email" : null),
      firstName: (value) =>
        normalizeString(value).length < 2
          ? "Please enter your first name"
          : null,
      lastName: (value) =>
        normalizeString(value).length < 2
          ? "Please enter your last name"
          : null,
      password: (value) =>
        normalizeString(value).length < 6
          ? "Your password must have mor than 5 characters"
          : null,
      userName: (value) =>
        normalizeString(value).length < 4
          ? "Your username must have more than 3 characters"
          : null,
    },
  });

  async function doRegister(data: RegisterFormInputs) {
    setStatus({ status: "loading" });
    const res = await register(data);
    if (res === "existing-user") {
      setStatus({
        status: "error",
        title: "There's a user with this username or email already registered.",
      });
    } else if (res === "unknown-error") {
      setStatus({
        status: "error",
        title:
          "Oops! Something went wrong. Please report it to the administrators.",
      });
    } else {
      const validationId = await createUserValidation(res.id);

      if (
        !validationId ||
        validationId === "failure" ||
        validationId === "unauthenticated" ||
        validationId === "unauthorized"
      ) {
        setStatus({
          status: "warning",
          title: `Something went wrong and an email couldn't be sent to you.`,
          message:
            "Send an email to visualdynamics@fiocruz.br detailing this to proceed.",
        });
        return;
      }

      const html = await render(
        <AccountActivationEmail
          email={res.email}
          firstName={res.firstName}
          validationURL={`${window.location.protocol}//${window.location.host}/account/email-validation/${validationId}`}
        />
      );

      const result = await sendMail(
        res.email,
        html,
        "[LABIOQUIM] Your account activation link."
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
          title: "Your account has been created.",
          message: "You just need to confirm your account via email now.",
        });
      }
    }
  }

  return (
    <Box
      component="form"
      className={classes.formContainer}
      onSubmit={onSubmit(doRegister)}
    >
      {status && status.status !== "loading" && <Alert status={status} />}
      <Group gap="sm" w="100%">
        <TextInput
          disabled={status?.status === "loading"}
          label="First Name"
          placeholder="e.g.: John"
          withAsterisk
          style={{ flex: 1 }}
          {...getInputProps("firstName")}
        />
        <TextInput
          disabled={status?.status === "loading"}
          label="Last Name"
          placeholder="e.g.: Doe"
          withAsterisk
          style={{ flex: 1 }}
          {...getInputProps("lastName")}
        />
      </Group>
      <TextInput
        disabled={status?.status === "loading"}
        label="Username"
        placeholder="e.g.: johndoe"
        withAsterisk
        {...getInputProps("userName")}
      />
      <TextInput
        disabled={status?.status === "loading"}
        label="Email"
        placeholder="e.g.: john@doe.com"
        withAsterisk
        {...getInputProps("email")}
      />
      <PasswordInput
        disabled={status?.status === "loading"}
        label="Password"
        placeholder="******"
        withAsterisk
        type="password"
        {...getInputProps("password")}
      />

      <Button loading={status?.status === "loading"} type="submit">
        Register
      </Button>
    </Box>
  );
}
