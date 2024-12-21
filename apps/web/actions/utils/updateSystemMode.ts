"use server";
import { prisma, SYSTEM_MODE } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function updateSystemMode(systemId: string, systemMode: string) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  try {
    await prisma.settings.update({
      where: {
        systemId,
      },
      data: {
        systemMode: systemMode as SYSTEM_MODE,
      },
    });

    return "success";
  } catch {
    return "error";
  }
}
