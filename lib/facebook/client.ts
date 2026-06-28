/**
 * lib/facebook/client.ts
 *
 * Helper for exchanging a Facebook OAuth "code" for an access token.
 *
 * LivePost requirement:
 * - Return the FULL access token for server-side use (never send it to clients).
 * - Also return a SHORT PREVIEW for diagnostics/logging.
 */

const FB_OAUTH_BASE = "https://graph.facebook.com/v21.0/oauth/access_token";

export type FacebookTokenResult = {
  ok: boolean;

  /**
   * Full access token, for server-side use ONLY.
   * Do NOT send this value to the browser or logs.
   */
  accessToken?: string;

  /**
   * Short preview for safe diagnostics:
   * e.g. "ABCD...WXYZ"
   */
  accessTokenPreview?: string;

  /**
   * Token lifetime in seconds, if provided by Facebook.
   */
  expiresIn?: number;

  /**
   * Error code/message when ok === false.
   */
  error?: string;
};

export async function exchangeFacebookCodeForToken(params: {
  code: string;
  redirectUri: string;
}): Promise<FacebookTokenResult> {
  const clientId = process.env.FACEBOOK_APP_ID;
  const clientSecret = process.env.FACEBOOK_APP_SECRET;

  if (!clientId || !clientSecret) {
    return {
      ok: false,
      error: "missing_facebook_env",
    };
  }

  const url = new URL(FB_OAUTH_BASE);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("client_secret", clientSecret);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("code", params.code);

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });

  let json: any;
  try {
    json = await res.json();
  } catch {
    return {
      ok: false,
      error: "facebook_response_parse_error",
    };
  }

  if (!res.ok) {
    const message: string | undefined =
      typeof json?.error?.message === "string"
        ? json.error.message
        : undefined;

    return {
      ok: false,
      error: message ?? "facebook_token_error",
    };
  }

  const accessToken =
    typeof json.access_token === "string" ? json.access_token : undefined;

  const expiresIn =
    typeof json.expires_in === "number" ? json.expires_in : undefined;

  const accessTokenPreview =
    accessToken && accessToken.length >= 8
      ? accessToken.slice(0, 4) + "..." + accessToken.slice(-4)
      : accessToken
      ? accessToken.slice(0, 4) + "...????"
      : undefined;

  return {
    ok: true,
    accessToken,
    accessTokenPreview,
    expiresIn,
  };
}