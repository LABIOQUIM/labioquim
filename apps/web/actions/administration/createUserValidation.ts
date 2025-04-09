"use server";
import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function createUserValidation(userId: string) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  try {
    await prisma.userEmailValidation.delete({
      where: {
        userId,
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
  } catch (e) {
    console.log("createUserValidation: " + e);
    return "failure";
  }
}
