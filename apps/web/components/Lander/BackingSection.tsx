import { SimpleGrid } from "@mantine/core";
import Image from "next/image";

import FIOCRUZ from "@/assets/fiocruz.jpg";
import FIOCRUZRO from "@/assets/fiocruz-ro.png";
import LABIOQUIM from "@/assets/labioquim.png";
import UFCSPA from "@/assets/ufcspa.png";

import styles from "./BackingSection.module.css";

const backers = [
  {
    name: "LABIOQUIM",
    image: LABIOQUIM,
  },
  {
    name: "FIOCRUZ",
    image: FIOCRUZ,
  },
  {
    name: "FIOCRUZ/RO",
    image: FIOCRUZRO,
  },
  {
    name: "UFCSPA",
    image: UFCSPA,
  },
];

export function LanderBackingSection() {
  return (
    <SimpleGrid
      className={styles.backersWrapper}
      cols={{ base: 1, md: 2 }}
      spacing={{ base: "lg", sm: "xl" }} // Mantine spacing tokens
    >
      {backers.map((backer) => (
        <Image
          alt={backer.name}
          className={styles.backerImage}
          key={backer.name}
          src={backer.image}
        />
      ))}
    </SimpleGrid>
  );
}
