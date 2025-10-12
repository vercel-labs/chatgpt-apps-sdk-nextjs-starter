import { useOpenAIGlobal } from "./use-openai-global";

export const useMaxHeight = (): number | null => {
  return useOpenAIGlobal("maxHeight");
};
