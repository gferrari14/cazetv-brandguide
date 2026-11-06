// Email domains whose Google accounts may enter the site.
// The database enforces the same rule in public.is_site_member().
export const ALLOWED_EMAIL_DOMAINS = ["livemode.com"] as const;

export function isAllowedSiteEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const at = email.lastIndexOf("@");
  if (at <= 0) return false;
  const domain = email.slice(at + 1).trim().toLowerCase();
  return (ALLOWED_EMAIL_DOMAINS as readonly string[]).includes(domain);
}

/** Sanitises a post-login destination to a same-origin path. */
export function safeRedirectPath(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith("/auth")) return "/";
  return value;
}
