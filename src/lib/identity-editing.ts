// Editing re-enabled by the site owner; set to false to lock again.
export const IDENTITY_EDITING_ENABLED: boolean = true;

export function assertIdentityEditingEnabled(): void {
  if (!IDENTITY_EDITING_ENABLED) {
    throw new Error("A EDIÇÃO DE IDENTIDADES ESTÁ TEMPORARIAMENTE BLOQUEADA.");
  }
}