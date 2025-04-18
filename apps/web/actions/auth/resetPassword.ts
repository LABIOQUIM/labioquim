"use server";

import { argon2id, hash } from "argon2";
import { prisma } from "database";

export async function resetPassword(id: string, prePass: string) {
  try {
    const passwordReset = await prisma.userPasswordReset.findFirst({
      where: {
        id,
      },
    });

    if (!passwordReset) {
      return "no-reset";
    }

    const password = await hash(prePass, { type: argon2id });

    await prisma.user.update({
      where: {
        id: passwordReset.userId,
      },
      data: {
        password,
      },
    });

    await prisma.userPasswordReset.update({
      where: {
        id,
      },
      data: {
        used: true,
        usable: false,
      },
    });

    return "success";
  } catch {
    return "failed";
  }
}
