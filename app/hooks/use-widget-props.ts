/**
 * Source: https://github.com/openai/openai-apps-sdk-examples/tree/main/src
 */

import { useOpenAIGlobal } from "./use-openai-global";

/**
 * Hook to get widget props (tool output) from ChatGPT.
 * 
 * @param defaultState - Default value or function to compute it if tool output is not available
 * @returns The tool output props or the default fallback
 * 
 * @example
 * ```tsx
 * const props = useWidgetProps({ userId: "123", name: "John" });
 * ```
 */
export function useWidgetProps<T extends Record<string, unknown>>(
  defaultState?: T | (() => T)
): T {
  const toolOutput = useOpenAIGlobal("toolOutput") as T;

  const fallback =
    typeof defaultState === "function"
      ? (defaultState as () => T | null)()
      : defaultState ?? null;

  return toolOutput ?? fallback;
}
