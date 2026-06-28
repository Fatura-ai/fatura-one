import { cookies } from "next/headers";

export type Lang = "sv" | "en";

export async function getServerLang(): Promise<Lang> {
  const c = (await cookies()).get("lang")?.value;
  return c === "en" ? "en" : "sv";
}
