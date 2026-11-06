// Enabled at the site owner's request; lock again only on explicit request.
export const IDENTITY_EDITING_ENABLED: boolean = true;

export function assertIdentityEditingEnabled(): void {
  if (!IDENTITY_EDITING_ENABLED) {
    throw new Error("A EDIÇÃO DE IDENTIDADES ESTÁ TEMPORARIAMENTE BLOQUEADA.");
  }
}
