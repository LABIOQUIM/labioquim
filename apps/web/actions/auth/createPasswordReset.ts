"use server";
import { prisma } from "database";

export async function createPasswordReset(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    const passwordReset = await prisma.userPasswordReset.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await prisma.userPasswordReset.updateMany({
      where: {
        userId: user.id,
        id: { not: passwordReset.id },
      },
      data: {
        usable: false,
      },
    });

    return {
      resetId: passwordReset.id,
      email: user.email,
      firstName: user.firstName,
    };
  }

  return "no-user";
}
