// lib/kv.ts
import { kv } from "@vercel/kv";

/**
 * Retrieves recent logs from Vercel KV quickly and safely.
 * Reads items in parallel and caps limit to prevent timeout.
 */
export async function getLogs(limit = 50) {
  try {
    const safeLimit = Math.min(limit, 200);
    let ids: string[] = [];

    try {
      ids = await kv.zrange("postara:logs:ids", -safeLimit, -1);
    } catch {
      ids = await kv.lrange("postara:logs:ids", -safeLimit, -1);
    }

    if (!ids?.length) return [];

    const items = await Promise.all(
      ids.map(async (id) => {
        try {
          return await kv.get(`postara:logs:item:${id}`);
        } catch {
          return null;
        }
      })
    );

    return items.filter(Boolean).reverse();
  } catch (err) {
    console.error("KV read failed:", err);
    return [];
  }
}
