"use server";
import { prisma } from "database";

export async function createUserValidation(userId: string) {
  try {
    const existingValidation = await prisma.userEmailValidation.findFirst({
      where: {
        userId,
      },
    });

    if (existingValidation) {
      await prisma.userEmailValidation.delete({
        where: {
          userId,
        },
      });
    }

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
