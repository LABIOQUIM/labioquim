"use server";
import { Prisma, prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function updateSimulation(
  id: string,
  nextData: Prisma.SimulationUpdateInput
) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (!(user.role === "ADMINISTRATOR")) {
    return "unauthorized";
  }

  try {
    await prisma.simulation.update({
      where: {
        id,
      },
      data: {
        ...nextData,
      },
    });

    return "success";
  } catch {
    //

    return "unhandled-prisma-error";
  }
}
