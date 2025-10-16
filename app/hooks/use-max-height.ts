/**
 * Source: https://github.com/openai/openai-apps-sdk-examples/tree/main/src
 */

import { useOpenAIGlobal } from "./use-openai-global";

/**
 * Hook to get the maximum height available for the widget.
 * Useful for responsive layouts that need to adapt to container constraints.
 * 
 * @returns The maximum height in pixels, or null if not available
 * 
 * @example
 * ```tsx
 * const maxHeight = useMaxHeight();
 * const style = { maxHeight: maxHeight ?? "100vh", overflow: "auto" };
 * ```
 */
export function useMaxHeight(): number | null {
  return useOpenAIGlobal("maxHeight");
}
