"use server";
import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getSimulationsCount(queryText?: string) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (!(user.role === "ADMINISTRATOR")) {
    return "unauthorized";
  }

  const simulationCount = await prisma.simulation.count({
    ...(queryText
      ? {
          where: {
            user: {
              OR: [
                { email: { contains: queryText, mode: "insensitive" } },
                { firstName: { contains: queryText, mode: "insensitive" } },
                { lastName: { contains: queryText, mode: "insensitive" } },
                { userName: { contains: queryText, mode: "insensitive" } },
              ],
            },
          },
        }
      : {}),
  });

  return simulationCount;
}
