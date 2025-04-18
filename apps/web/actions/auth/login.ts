"use server";
import { verify } from "argon2";
import { prisma, USER_STATUS } from "database";
import { cookies } from "next/headers";

import { lucia } from "@/lib/lucia";
import { normalizeString } from "@/utils/normalizeString";

const signInReturnCodes: {
  [key in Exclude<USER_STATUS, "ACTIVE">]: string;
} = {
  AWAITING_EMAIL_VALIDATION:
    "Your must validate your email before accessing the platform.",
  DISABLED_BY_ADMINISTRATOR:
    "Your access to the platform has been revoked by an administrator",
  INACTIVE: "Your account has been disabled due to inactivity",
};

export async function login(userName: string, password: string) {
  try {
    const trimmedUserName = normalizeString(userName);

    const user = await prisma.user.findFirst({
      where: {
        userName: trimmedUserName,
      },
    });

    if (!user) {
      return "invalid-credentials";
    }

    if (user.status !== "ACTIVE") {
      return signInReturnCodes[user.status];
    }

    if (!user.password || !(await verify(user.password, password))) {
      return "invalid-credentials";
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return "authenticated";
  } catch (e) {
    console.log("Login: " + e);

    return "unknown-error";
  }
}
