import { useCallback } from "react";

/**
 * Hook to send follow-up messages to ChatGPT
 * @returns A function to send messages to the ChatGPT conversation
 */
export function useSendMessage() {
  const sendMessage = useCallback((prompt: string) => {
    if (typeof window !== "undefined" && window?.openai?.sendFollowUpMessage) {
      return window.openai.sendFollowUpMessage({ prompt });
    }
    return Promise.resolve();
  }, []);

  return sendMessage;
}

