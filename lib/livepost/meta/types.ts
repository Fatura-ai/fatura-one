export type MetaConnectionStatus = "active" | "expired" | "revoked";

export interface MetaConnectionRecord {
  platform: "facebook";
  userId: string;

  // Facebook Page
  pageId: string;
  pageName: string;
  pageAccessToken: string;

  // Instagram Business (optional)
  instagramBusinessId: string | null;

  // Permissions granted
  scopes: string[];

  // Timestamps (ISO 8601 strings)
  connectedAt: string;   // when we first stored the connection
  updatedAt: string;     // last time refreshed
  expiresAt: string | null; // null if long-lived / unknown

  status: MetaConnectionStatus;
}