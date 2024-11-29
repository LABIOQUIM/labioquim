"use server";
import axios from "axios";
import { Prisma, prisma, User } from "database";

import { validateAuth } from "../auth/validateAuth";

export async function updateUser(
  currentUser: User,
  nextData: Prisma.UserUpdateInput
) {
  const { user } = await validateAuth();

  if (!user) {
    return "unauthenticated";
  }

  if (!(user.role === "ADMINISTRATOR")) {
    return "unauthorized";
  }

  try {
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        ...nextData,
        role: currentUser.id === user.id ? user.role : nextData.role,
      },
    });

    if (
      currentUser.status !== "DISABLED_BY_ADMINISTRATOR" &&
      nextData.status === "DISABLED_BY_ADMINISTRATOR"
    ) {
      await axios.post("http://mailer:3000/send-email", {
        from: `LABIOQUIM <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "[LABIOQUIM] About your account",
        template: "account-disabled.hbs",
        context: {
          name: user.firstName,
          username: user.userName,
        },
      });
    }

    if (
      currentUser.status === "DISABLED_BY_ADMINISTRATOR" &&
      nextData.status !== "DISABLED_BY_ADMINISTRATOR"
    ) {
      await axios.post("http://mailer:3000/send-email", {
        from: `LABIOQUIM <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: "[LABIOQUIM] About your account",
        template: "account-reenabled.hbs",
        context: {
          name: user.firstName,
          username: user.userName,
        },
      });
    }

    return "success";
  } catch {
    //

    return "unhandled-prisma-error";
  }
}
