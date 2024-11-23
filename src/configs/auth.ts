import { passwordSchema } from "@/app/auth/_models/schema"
import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/libs/prisma"
import { mailOptions, transporter } from "./nodemailer"

// const users = [
//   { id: "1", name: "Anna", email: "test@example.local", password: "12345678" },
//   { id: "2", name: "Vika", email: "vika@example.local", password: "12345678" },
// ]

const users = [
  { id: "1", name: "Anna", email: "test@example.local", password: "$2a$10$31DjEB91EG6F9L9SrSsoaOdKJ55tCGHHlviQ8173M7DQQqofjPp4W" },
  { id: "2", name: "Vika", email: "vika@example.local", password: "$2a$10$/9pGtq8h6VzqFhy4inu9G.HhGKaEfP1owivCt5b7PZ86m32RL7kku" },
]

// console.log(bcrypt.hashSync("12345678"))

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60, // 90 дней
  },
  pages: {
    signIn: "/auth/login",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        // if (!credentials?.email || !credentials.password) {
        //   throw new Error("Введите email и пароль")
        // }

        const { email, password } = await passwordSchema.parseAsync(credentials)

        // const user = users.find((u) => u.email === email && u.password === password)

        const user = users.find((u) => u.email === email)

        if (!user) {
          throw new Error("Неправильные email или пароль")
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
          throw new Error("Неправильные email или пароль")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
      async sendVerificationRequest(params) {
        const { identifier, url } = params
        const { host } = new URL(url)

        if (process.env.NODE_ENV === "development") {
          console.log(`Link ${identifier}: ${url}`)
          return
        }

        const result = await transporter.sendMail({
          ...mailOptions,
          to: identifier,
          subject: `Вход на сайт ${host}`,
          text: text({ url, host }),
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email не может быть отправлен`)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
        }
      }
      return session
    },
  },
}

function text({ url, host }: { url: string; host: string }) {
  return `Ссылка для входа на сайт ${host}\n${url}\n\n`
}

export default NextAuth(authOptions)
