import { Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/assets/visualdynamics.svg";

import classes from "./Logo.module.css";

interface Props {
  size?: "normal" | "large";
}

export function Logo({ size = "normal" }: Props) {
  const height = {
    normal: 48,
    large: 96,
  };
  return (
    <Box component={Link} href="/" className={classes.container}>
      <Image
        alt=""
        src={LogoImage}
        style={{ height: height[size], width: "auto" }}
      />
    </Box>
  );
}
