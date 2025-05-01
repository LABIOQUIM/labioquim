"use server";
import { api } from "@/lib/apis";

import { validateAuth } from "../auth/validateAuth";

export async function downloadUserFile(path: string) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (user.role !== "ADMINISTRATOR") {
    return "unauthorized";
  }

  const response = await api.get(`/simulation/download/file?path=${path}`, {
    headers: {
      "x-username": user.userName,
    },
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data).toString("base64");
}
