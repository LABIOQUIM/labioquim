"use server";
import { prisma, USER_STATUS } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getUserCount(
  queryText?: string,
  queryStatus?: USER_STATUS
) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (!(user.role === "ADMINISTRATOR")) {
    return "unauthorized";
  }

  const userCount = await prisma.user.count({
    where: {
      ...(queryText
        ? {
            OR: [
              { email: { contains: queryText, mode: "insensitive" } },
              { firstName: { contains: queryText, mode: "insensitive" } },
              { lastName: { contains: queryText, mode: "insensitive" } },
              { userName: { contains: queryText, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(queryStatus ? { status: queryStatus } : {}),
    },
  });

  return userCount;
}
