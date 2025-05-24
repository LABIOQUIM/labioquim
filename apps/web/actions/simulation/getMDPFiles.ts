"use server";
import { api } from "@/lib/apis";

import { validateAuth } from "../auth/validateAuth";

export async function getMDPFiles() {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  const response = await api.get(`/simulation/downloads/mdp`, {
    headers: {
      "x-username": user.userName,
    },
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data).toString("base64");
}
