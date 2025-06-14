import { Anchor, Paper, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import VISUAL_DYNAMICS_LOGO from "@/assets/visualdynamics.svg";
import { Register } from "@/components/Auth/Register/Register";

import classes from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Image
          alt="Visual Dynamics Logo"
          className={classes.logo}
          src={VISUAL_DYNAMICS_LOGO}
        />
        <Title order={2} className={classes.title}>
          Create Account
        </Title>

        <Register />

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor component={Link} href="/auth/login" fw={500}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
