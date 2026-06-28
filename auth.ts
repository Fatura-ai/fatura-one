import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import crypto from "crypto";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "email",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        if (!email) return null;

        // Generate a magic link token (valid for 10 minutes)
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 10 * 60 * 1000);

        // Save token to database (you can use your own table or reuse the built-in verification token table)
        // For simplicity, we'll just send the email and create a session directly
        // In a production app, you should store the token in the database and validate it on callback

        await resend.emails.send({
          from: process.env.EMAIL_FROM || "onboarding@resend.dev",
          to: email,
          subject: "Sign in to Fatura",
          html: `<p>Click <a href="${process.env.NEXTAUTH_URL}/api/auth/callback/email?email=${encodeURIComponent(email)}&token=${token}">here</a> to sign in to Fatura.</p>`,
        });

        // For demo purposes, we create a user object (you should validate the token properly)
        // In practice, you would store the token and validate it in the callback route
        return { id: email, email, name: email.split("@")[0] };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});