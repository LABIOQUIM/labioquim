"use server";

import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getSimulation(id: string) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (user.role !== "ADMINISTRATOR") {
    return "unauthorized";
  }

  const simulation = await prisma.simulation.findFirst({
    where: {
      id,
    },
  });

  return simulation;
}
