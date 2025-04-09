"use server";
import { argon2id, hash } from "argon2";
import { prisma } from "database";

import { normalizeString } from "@/utils/normalizeString";

export async function register(data: RegisterFormInputs) {
  try {
    data.userName = normalizeString(data.userName);

    data.password = await hash(data.password, { type: argon2id });

    const user = await prisma.user.create({
      data,
    });

    return user;
  } catch (e: any) {
    if (e && e.code && e.code === "P2002") {
      return "existing-user";
    }

    console.log("Register: " + e);

    return "unknown-error";
  }
}
