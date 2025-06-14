"use client";
import { ActionIcon } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  to?: string;
}

export function GoBackButton({ to }: Props) {
  const router = useRouter();

  if (!to) {
    return (
      <ActionIcon onClick={router.back} size="lg" variant="light">
        <IconArrowLeft />
      </ActionIcon>
    );
  }

  return (
    <Link href={to}>
      <ActionIcon size="lg" variant="light">
        <IconArrowLeft />
      </ActionIcon>
    </Link>
  );
}
