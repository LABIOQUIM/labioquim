"use server";

import { prisma } from "database";

export async function getPasswordReset(id: string) {
  const passwordReset = await prisma.userPasswordReset.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!passwordReset) {
    return "no-reset";
  }

  return passwordReset;
}
