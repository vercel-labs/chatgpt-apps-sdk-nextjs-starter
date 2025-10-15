import { useState } from "react";

export function useIsChatGptApp(): boolean {
  const [isChatGptApp] = useState(() => {
    if (typeof window === "undefined") return false;
    return (window as any).__isChatGptApp ?? false;
  });

  return isChatGptApp;
}
