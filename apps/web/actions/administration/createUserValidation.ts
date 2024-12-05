"use server";
import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function createUserValidation(userId: string) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (user.role !== "ADMINISTRATOR") {
    return "unauthorized";
  }

  try {
    await prisma.userEmailValidation.updateMany({
      where: {
        userId,
        valid: true,
      },
      data: {
        valid: false,
      },
    });

    const newValidation = await prisma.userEmailValidation.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newValidation.id;
  } catch {
    return "failure";
  }
}
