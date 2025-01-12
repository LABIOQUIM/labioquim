"use server";
import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getAllSettings() {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  try {
    const settings = await prisma.settings.findMany();

    return settings;
  } catch (e) {
    console.log(e);
    return "error";
  }
}
