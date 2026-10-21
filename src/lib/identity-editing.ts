// Re-enable only after the site owner explicitly requests it.
export const IDENTITY_EDITING_ENABLED: boolean = false;

export function assertIdentityEditingEnabled(): void {
  if (!IDENTITY_EDITING_ENABLED) {
    throw new Error("A EDIÇÃO DE IDENTIDADES ESTÁ TEMPORARIAMENTE BLOQUEADA.");
  }
}