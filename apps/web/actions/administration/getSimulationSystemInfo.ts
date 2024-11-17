"use server";
import { api } from "@/lib/apis";

import { validateAuth } from "../auth/validateAuth";

export async function getSimulationSystemInfo() {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  const response = await api.get<SystemInformation>("/systeminfo", {
    headers: {
      "x-username": user.userName,
    },
  });

  return response.data;
}
