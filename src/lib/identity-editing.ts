// Locked at the site owner's request; re-enable only on explicit request.
export const IDENTITY_EDITING_ENABLED: boolean = false;

export function assertIdentityEditingEnabled(): void {
  if (!IDENTITY_EDITING_ENABLED) {
    throw new Error("A EDIÇÃO DE IDENTIDADES ESTÁ TEMPORARIAMENTE BLOQUEADA.");
  }
}
