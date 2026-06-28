import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          role: "CREATOR",
          subscriptionStatus: "NONE",
        },
      });
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save token to database
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
      update: {
        token,
        expires,
      },
      create: {
        identifier: email,
        token,
        expires,
      },
    });

    const magicLink = `https://fatura.one/api/auth/magic-verify?token=${token}&email=${encodeURIComponent(email)}`;

    console.log("\n" + "=".repeat(60));
    console.log("MAGIC LINK");
    console.log("=".repeat(60));
    console.log(`Email: ${email}`);
    console.log(`Link: ${magicLink}`);
    console.log("=".repeat(60) + "\n");

    return NextResponse.json({ success: true, link: magicLink });
  } catch (error) {
    console.error("Magic link error:", error);
    return NextResponse.json(
      { error: "Failed to generate magic link" },
      { status: 500 }
    );
  }
}