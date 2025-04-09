"use server";
import axios from "axios";

export async function sendMail(to: string, html: string, subject: string) {
  try {
    await axios.post("http://mailer:3000/send-email", {
      from: `LABIOQUIM <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    return "success";
  } catch (e) {
    console.log("sentMail: " + e);
    return "failure";
  }
}
