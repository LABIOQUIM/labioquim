"use server";
import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getUserCount(queryText?: string) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (!(user.role === "ADMINISTRATOR")) {
    return "unauthorized";
  }

  const userCount = await prisma.user.count({
    ...(queryText
      ? {
          where: {
            OR: [
              { email: { contains: queryText, mode: "insensitive" } },
              { firstName: { contains: queryText, mode: "insensitive" } },
              { lastName: { contains: queryText, mode: "insensitive" } },
              { userName: { contains: queryText, mode: "insensitive" } },
            ],
          },
        }
      : {}),
  });

  return userCount;
}
