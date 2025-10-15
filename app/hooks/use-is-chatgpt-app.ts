import { useSyncExternalStore } from "react";

export function useIsChatGptApp(): boolean {
  return useSyncExternalStore(
    () => {
      // No subscription needed for this static value
      return () => {};
    },
    () => {
      // Client snapshot - check the actual window value
      if (typeof window === "undefined") return false;
      return (window as any).__isChatGptApp ?? false;
    },
    () => {
      // Server snapshot - always false since window is undefined on server
      return false;
    }
  );
}
