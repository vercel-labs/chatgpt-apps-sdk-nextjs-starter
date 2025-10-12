import { useCallback } from "react";
import type { CallToolResponse } from "./types";

/**
 * Hook to call MCP tools directly from the widget
 * @returns A function to call tools with name and arguments
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

