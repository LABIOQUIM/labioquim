"use server";
import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getSettings(systemId: string) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  try {
    let settings = await prisma.settings.findFirst({
      where: {
        systemId,
      },
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          systemId,
          systemMode: "DOWN",
        },
      });
    }

    return settings;
  } catch (e) {
    console.log(e);
    return "error";
  }
}
