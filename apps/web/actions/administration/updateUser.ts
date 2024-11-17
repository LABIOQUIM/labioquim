"use server";
import { Prisma, prisma, User } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function updateUser(
  currentUser: User,
  nextData: Prisma.UserUpdateInput
) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (!(user.role === "ADMINISTRATOR")) {
    return "unauthorized";
  }

  try {
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        ...nextData,
        role: currentUser.id === user.id ? user.role : nextData.role,
      },
    });

    return "success";
  } catch {
    //

    return "unhandled-prisma-error";
  }
}
