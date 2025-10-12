import { useCallback } from "react";
import type { DisplayMode } from "./types";

/**
 * Hook to request display mode changes
 * @returns A function to request a specific display mode (pip, inline, fullscreen)
 */
export function useRequestDisplayMode() {
  const requestDisplayMode = useCallback(async (mode: DisplayMode) => {
    if (typeof window !== "undefined" && window?.openai?.requestDisplayMode) {
      return await window.openai.requestDisplayMode({ mode });
    }
    return { mode };
  }, []);

  return requestDisplayMode;
}

