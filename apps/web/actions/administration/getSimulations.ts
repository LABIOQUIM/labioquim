"use server";
import { prisma } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function getSimulations(
  queryText: string,
  take: number,
  page: number
) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (user.role !== "ADMINISTRATOR") {
    return "unauthorized";
  }

  const simulations = await prisma.simulation.findMany({
    where: {
      OR: [
        { moleculeName: { contains: queryText, mode: "insensitive" } },
        { ligandITPName: { contains: queryText, mode: "insensitive" } },
        { ligandPDBName: { contains: queryText, mode: "insensitive" } },
        { errorCause: { contains: queryText, mode: "insensitive" } },
        {
          user: {
            OR: [
              { email: { contains: queryText, mode: "insensitive" } },
              { firstName: { contains: queryText, mode: "insensitive" } },
              { lastName: { contains: queryText, mode: "insensitive" } },
              { userName: { contains: queryText, mode: "insensitive" } },
            ],
          },
        },
      ],
    },
    select: {
      id: true,
      createdAt: true,
      endedAt: true,
      errorCause: true,
      ligandITPName: true,
      ligandPDBName: true,
      moleculeName: true,
      startedAt: true,
      status: true,
      type: true,
      userId: true,
      user: {
        select: {
          userName: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    take,
    skip: (page - 1) * take || 0,
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(simulations);

  return simulations;
}
