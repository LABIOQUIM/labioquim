import React from "react";
import { Box } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

import styles from "./Footer.module.css";

export function LanderFooter() {
  return (
    <Box component="footer" className={styles.footer}>
      <div className={styles.innerFooter}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Visual Dynamics - Fiocruz. All rights
          reserved.
        </p>
        <div className={styles.links}>
          <Link href="https://portal.fiocruz.br/" passHref legacyBehavior>
            <a className={styles.link} target="_blank">
              Fiocruz
            </a>
          </Link>
          <Link href="/privacy" passHref legacyBehavior>
            <a className={styles.link}>Privacy Policy</a>
          </Link>
          <Link href="/terms" passHref legacyBehavior>
            <a className={styles.link}>Terms of Use</a>
          </Link>
        </div>
        <div className={styles.socialIcons}>
          <a
            href="https://github.com/LNCC/visualdynamics"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
          >
            <IconBrandGithub size={22} stroke={1.5} />
          </a>
          {/* Add other social links if available */}
          {/* <a href="https://twitter.com/fiocruz" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
            <IconBrandTwitter size={22} stroke={1.5} />
          </a> */}
        </div>
      </div>
    </Box>
  );
}
