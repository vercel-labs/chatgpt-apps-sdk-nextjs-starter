/**
 * Source: https://github.com/openai/openai-apps-sdk-examples/tree/main/src
 */

import { useSyncExternalStore } from "react";
import {
  SET_GLOBALS_EVENT_TYPE,
  SetGlobalsEvent,
  type OpenAIGlobals,
} from "./types";

/**
 * Low-level hook to subscribe to a specific OpenAI global value.
 * Uses React's useSyncExternalStore for efficient reactivity.
 * 
 * @param key - The key of the OpenAI global to subscribe to
 * @returns The current value of the global or null if not available
 * 
 * @example
 * ```tsx
 * const theme = useOpenAIGlobal("theme"); // "light" | "dark" | null
 * ```
 */
export function useOpenAIGlobal<K extends keyof OpenAIGlobals>(
  key: K
): OpenAIGlobals[K] | null {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const handleSetGlobal = (event: SetGlobalsEvent) => {
        const value = event.detail.globals[key];
        if (value === undefined) {
          return;
        }

        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal);
      };
    },
    () => (typeof window !== "undefined" ? window.openai?.[key] ?? null : null),
    () => null
  );
}
