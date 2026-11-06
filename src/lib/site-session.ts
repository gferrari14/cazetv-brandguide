import { supabase } from "@/integrations/supabase/client";
import { setIdentityEditingAllowed } from "@/lib/identity-editing";
import { isAllowedSiteEmail } from "@/lib/site-access";

export type SiteAccess =
  | { status: "signed-out" }
  | { status: "not-member"; email: string | null }
  | { status: "member"; email: string; isAdmin: boolean };

export async function getSiteAccess(): Promise<SiteAccess> {
  const { data, error } = await supabase.auth.getUser();
  const user = data.user;
  if (error || !user) {
    setIdentityEditingAllowed(false);
    return { status: "signed-out" };
  }
  const email = user.email ?? null;
  if (!email || !isAllowedSiteEmail(email)) {
    setIdentityEditingAllowed(false);
    return { status: "not-member", email };
  }
  const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
  setIdentityEditingAllowed(isAdmin === true);
  return { status: "member", email, isAdmin: isAdmin === true };
}

export async function signOutOfSite(): Promise<void> {
  setIdentityEditingAllowed(false);
  await supabase.auth.signOut();
}
