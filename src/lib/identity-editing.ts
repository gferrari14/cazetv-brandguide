import { useSyncExternalStore } from "react";

// Editing is available only to site administrators. The flag is set by the
// signed-in gate from the database role check; the database enforces the same
// rule independently, so this only controls what the interface shows.
let editingAllowed = false;
const listeners = new Set<() => void>();

export function setIdentityEditingAllowed(value: boolean): void {
  if (editingAllowed === value) return;
  editingAllowed = value;
  listeners.forEach((listener) => listener());
}

export function canEditIdentities(): boolean {
  return editingAllowed;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useIdentityEditing(): boolean {
  return useSyncExternalStore(subscribe, canEditIdentities, () => false);
}

export function assertIdentityEditingEnabled(): void {
  if (!editingAllowed) {
    throw new Error("APENAS ADMINISTRADORES PODEM EDITAR AS IDENTIDADES.");
  }
}
