import { Anchor, Paper, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import VISUAL_DYNAMICS_LOGO from "@/assets/visualdynamics.svg";
import { Login } from "@/components/Auth/Login/Login";
import { GoBackButton } from "@/components/GoBackButton/GoBackButton";

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

        <div className={classes.titleWrapper}>
          <GoBackButton />
          <Title order={2} className={classes.title}>
            Login
          </Title>
        </div>

        <Login />

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor component={Link} href="/auth/register" fw={500}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
