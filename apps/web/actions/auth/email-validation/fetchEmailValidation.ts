"use server";
import { prisma } from "database";

export async function fetchEmailValidation(activationId: string) {
  return await prisma.userEmailValidation.findFirst({
    where: {
      id: activationId,
    },
    include: {
      user: {
        select: {
          firstName: true,
          email: true,
        },
      },
    },
  });
}
