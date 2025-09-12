import { RequestHandler } from "express";

export const handleContact: RequestHandler = (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Missing required fields" });
  }

  // Basic implementation: log submission server-side and return success.
  // For production, integrate an email provider or store messages in a database.
  // eslint-disable-next-line no-console
  console.log(`Contact form received: ${name} <${email}> - ${message.substring(0, 200)}`);

  return res.status(200).json({ ok: true, message: "Thanks — your message was received." });
};
