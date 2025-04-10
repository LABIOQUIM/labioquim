"use server";
import { prisma, USER_STATUS } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getUsers(
  queryText: string,
  take: number,
  page: number,
  queryStatus?: USER_STATUS
) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (user.role !== "ADMINISTRATOR") {
    return "unauthorized";
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: queryText, mode: "insensitive" } },
        { firstName: { contains: queryText, mode: "insensitive" } },
        { lastName: { contains: queryText, mode: "insensitive" } },
        { userName: { contains: queryText, mode: "insensitive" } },
      ],
      ...(queryStatus ? { status: queryStatus } : {}),
    },
    take,
    skip: (page - 1) * take || 0,
    orderBy: {
      userName: "asc",
    },
  });

  return users;
}
