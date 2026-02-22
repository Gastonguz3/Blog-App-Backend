import { Resend } from "resend";
import {ENV} from "./env.js"

const resend = new Resend(ENV.RESEND_API_KEY);

export const sendVerificationEmail = async ( email: string, token: string) => {
  const url = `${ENV.FRONTEND_URL}/verify/${token}`;

  const { error } = await resend.emails.send({
    from: "<onboarding@resend.dev>",
    to: email,
    subject: "Verifica tu cuenta",
    html: `
      <h1>Gracias por registrarte en Blog App</h1>
      <h2>Verifica tu cuenta:</h2>
      <a href="${url}">Click aquí para verificar</a>
    `,
  });

  if (error) {
    console.error("Error enviando mail:", error);
    throw new Error("No se pudo enviar el email");
  }
};