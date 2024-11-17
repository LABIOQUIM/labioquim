"use server";
import { api } from "@/lib/apis";

import { validateAuth } from "../auth/validateAuth";

export async function getSimulationQueueInfo() {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  const response = await api.get<SimulationQueueInformation>(
    "/simulation/queue-info",
    {
      headers: {
        "x-username": user.userName,
      },
    }
  );

  return response.data;
}
