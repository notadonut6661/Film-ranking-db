import { config } from "dotenv";
import { createTransport } from "nodemailer";
config();

export const Transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, 
  auth: {
    user: process.env.SMTP_USERNAME, 
    pass: process.env.SMTP_PASSWORD, 
  },
});