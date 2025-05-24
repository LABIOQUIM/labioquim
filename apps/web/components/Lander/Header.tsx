import React from "react";
import { Box, Group } from "@mantine/core"; // Group for layout, Box for semantic header
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link"; // Next.js Link

import VISUAL_DYNAMICS_LOGO from "@/assets/visualdynamics.svg";

import styles from "./Header.module.css";

export function LanderHeader() {
  return (
    <Box component="header" className={styles.header}>
      <div className={styles.innerHeader}>
        <Link href="/">
          <Image
            className={styles.logoImage}
            src={VISUAL_DYNAMICS_LOGO}
            alt="Visual Dynamics Logo"
          />
        </Link>
        <Group>
          {/* Mantine Group for spacing items is fine */}
          <nav className={styles.navLinks}>
            <Link href="/#features" passHref legacyBehavior>
              <a className={styles.navLink}>Features</a>
            </Link>
            <Link href="/#demo" passHref legacyBehavior>
              <a className={styles.navLink}>Demo</a>
            </Link>
            <Link
              href="https://visualdynamics.fiocruz.br/docs/"
              passHref
              legacyBehavior
            >
              <a className={styles.navLink} target="_blank">
                Docs{" "}
                <IconExternalLink
                  size={14}
                  style={{ marginLeft: "4px", verticalAlign: "middle" }}
                />
              </a>
            </Link>
          </nav>
          <Link
            href="/auth/login"
            rel="noopener noreferrer"
            className={styles.launchButton}
          >
            Launch App
          </Link>
        </Group>
      </div>
    </Box>
  );
}
