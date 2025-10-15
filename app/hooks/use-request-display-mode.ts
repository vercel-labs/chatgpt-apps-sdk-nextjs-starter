import { useCallback } from "react";
import type { DisplayMode } from "./types";

/**
 * Hook to request display mode changes from the ChatGPT host.
 * 
 * @returns A function to request a specific display mode. The host may reject the request.
 *          For mobile, PiP is always coerced to fullscreen.
 * 
 * @example
 * ```tsx
 * const requestDisplayMode = useRequestDisplayMode();
 * 
 * const handleExpand = async () => {
 *   const { mode } = await requestDisplayMode("fullscreen");
 *   console.log("Granted mode:", mode);
 * };
 * ```
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

