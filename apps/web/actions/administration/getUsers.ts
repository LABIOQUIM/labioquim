"use server";
import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getUsers() {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (!(user.role === "ADMINISTRATOR")) {
    return "unauthorized";
  }

  const users = await prisma.user.findMany();

  return users;
}
