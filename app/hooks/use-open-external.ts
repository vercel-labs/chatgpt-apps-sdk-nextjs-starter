import { useCallback } from "react";

/**
 * Hook to open external links through the ChatGPT client.
 * This ensures links open properly in native environments (mobile apps, desktop clients).
 * Falls back to standard window.open if not in ChatGPT environment.
 * 
 * @returns A function that opens external URLs in a new tab/window
 * 
 * @example
 * ```tsx
 * const openExternal = useOpenExternal();
 * 
 * const handleLinkClick = () => {
 *   openExternal("https://example.com");
 * };
 * 
 * return <button onClick={handleLinkClick}>Visit Site</button>;
 * ```
 */
export function useOpenExternal() {
  const openExternal = useCallback((href: string) => {
    if (typeof window === "undefined") {
      return;
    }

    // Try to use ChatGPT's native link handler
    if (window?.openai?.openExternal) {
      try {
        window.openai.openExternal({ href });
        return;
      } catch (error) {
        console.warn("openExternal failed, falling back to window.open", error);
      }
    }

    // Fallback to standard web behavior
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  return openExternal;
}

