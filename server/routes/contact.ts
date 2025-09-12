import { RequestHandler } from "express";

export const handleContact: RequestHandler = (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Missing required fields" });
  }

  // TODO: Integrate with an email provider (SendGrid, Mailgun, SMTP) or a database
  // for now, just log the submission and return success. Keep logs minimal.
  // eslint-disable-next-line no-console
  console.log(`Contact form received: ${name} <${email}> - ${message.substring(0, 200)}`);

  return res.status(200).json({ ok: true, message: "Thanks — your message was received." });
};
