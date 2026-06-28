// app/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/invoices");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Fatura
        </h1>
        <p className="text-gray-600 mb-8">
          Simple invoicing for everyone
        </p>
        <a
          href="/api/auth/signin"
          className="btn-primary inline-block"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}