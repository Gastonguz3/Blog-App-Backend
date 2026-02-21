import nodemailer from "nodemailer";
import { ENV } from "./env.js";

export const sendVerificationEmail = async (email: string, token: string) => {

  const transporter = nodemailer.createTransport({
    host: ENV.EMAIL_HOST,
    port: 587,
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS,
    },
  });

  const url = `${ENV.FRONTEND_URL}/verify/${token}`;

  await transporter.sendMail({
    from: ENV.EMAIL_USER,
    to: email,
    subject: "Verifica tu cuenta",
    html: `
      <h1>Gracias por completar el formulario de registro en mi Blog App </h1>
      <h2>Verifica tu cuenta:</h2>
      <a href="${url}">Click aquí para verificar</a>
    `,
  });
};
