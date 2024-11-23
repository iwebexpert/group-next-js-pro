import nodemailer from "nodemailer"
import type { MailOptions } from "nodemailer/lib/sendmail-transport"

const email = process.env.SMTP_FROM
const host = process.env.SMTP_HOST
const port = Number(process.env.SMTP_PORT)
const secure = process.env.SMTP_SSL === "true"

const user = process.env.SMTP_USER
const password = process.env.SMTP_PASSWORD

export const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: secure,
  auth: {
    user: user,
    pass: password,
  },
})

export const mailOptions: MailOptions = {
  from: email,
}
