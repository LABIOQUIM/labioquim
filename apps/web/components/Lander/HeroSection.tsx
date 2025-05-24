import React from "react";
import { Box } from "@mantine/core";

import styles from "./HeroSection.module.css";

export function LanderHeroSection() {
  return (
    <Box className={styles.hero}>
      <div className={styles.heroContainer}>
        {/* Replaces Mantine Container component's size prop */}
        <h1 className={styles.title}>Molecular Dynamics. Effortlessly.</h1>
        <p className={styles.subtitle}>
          VisualDynamics is a powerful web-based platform designed to simplify
          and democratize the process of performing molecular dynamics (MD)
          simulations.
        </p>
        {/* Group for layout is fine */}
        {/* <div className={styles.buttonsGroup}>
          <a
            href="https://visualdynamics.fiocruz.br/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButtonPrimary}
          >
            <IconPlayerPlay size={22} />
            Launch App
          </a>
          <Link href="#features" passHref legacyBehavior>
            <a className={styles.ctaButtonSecondary}>
              Explore Features
              <IconArrowRight size={20} />
            </a>
          </Link>
        </div> */}
      </div>
    </Box>
  );
}
