import { kv } from "@vercel/kv";
import type { MetaConnectionRecord, MetaConnectionStatus } from "./types";

function metaConnKey(userId: string): string {
  return `postara:conn:${userId}:facebook`;
}

/**
 * Fetch the Meta (Facebook/Instagram) LivePost connection for a user.
 * Returns null if no connection is stored.
 */
export async function getMetaConnection(
  userId: string
): Promise<MetaConnectionRecord | null> {
  if (!userId) {
    throw new Error("getMetaConnection: userId is required");
  }

  const key = metaConnKey(userId);
  const raw = await kv.get<string | null>(key);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as MetaConnectionRecord;
    return parsed;
  } catch {
    // If parsing fails, treat as no connection
    return null;
  }
}

/**
 * Save or update the Meta LivePost connection for a user.
 * Overwrites the existing record for that userId.
 */
export async function saveMetaConnection(
  record: MetaConnectionRecord
): Promise<void> {
  if (!record.userId) {
    throw new Error("saveMetaConnection: record.userId is required");
  }

  const key = metaConnKey(record.userId);
  const json = JSON.stringify(record);
  await kv.set(key, json);
}

/**
 * Update only the status (and updatedAt) of the Meta connection, if it exists.
 * If no record is found, this is a no-op.
 */
export async function updateMetaConnectionStatus(
  userId: string,
  status: MetaConnectionStatus
): Promise<void> {
  const existing = await getMetaConnection(userId);
  if (!existing) return;

  const updated: MetaConnectionRecord = {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  };

  await saveMetaConnection(updated);
}