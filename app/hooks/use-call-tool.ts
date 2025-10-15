import { useCallback } from "react";
import type { CallToolResponse } from "./types";

/**
 * Hook to call MCP (Model Context Protocol) tools directly from the widget.
 * 
 * @returns A function to call tools with their name and arguments.
 *          Returns the tool response or null if not available.
 * 
 * @example
 * ```tsx
 * const callTool = useCallTool();
 * 
 * const handleFetchData = async () => {
 *   const result = await callTool("search_database", { 
 *     query: "user data",
 *     limit: 10 
 *   });
 *   console.log(result?.result);
 * };
 * ```
 */
export function useCallTool() {
  const callTool = useCallback(
    async (name: string, args: Record<string, unknown>): Promise<CallToolResponse | null> => {
      if (typeof window !== "undefined" && window?.openai?.callTool) {
        return await window.openai.callTool(name, args);
      }
      return null;
    },
    []
  );

  return callTool;
}

