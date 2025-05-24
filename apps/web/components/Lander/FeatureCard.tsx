import React from "react";

import styles from "./FeatureCard.module.css";

interface FeatureCardProps {
  icon: React.ReactNode; // Expect a Tabler Icon component
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    // Using Paper as a semantic container, styling via CSS Module
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {/* Icon is passed as a child, already sized */}
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
