/**
 * Source: https://github.com/openai/openai-apps-sdk-examples/tree/main/src
 */

import { useCallback, useEffect, useState, type SetStateAction } from "react";
import { useOpenAIGlobal } from "./use-openai-global";
import type { UnknownObject } from "./types";

export function useWidgetState<T extends UnknownObject>(
  defaultState: T | (() => T)
): readonly [T, (state: SetStateAction<T>) => void];

export function useWidgetState<T extends UnknownObject>(
  defaultState?: T | (() => T | null) | null
): readonly [T | null, (state: SetStateAction<T | null>) => void];

/**
 * Hook to manage widget state that persists across widget lifecycles.
 * State is synchronized with the ChatGPT parent window and survives widget minimize/restore.
 * 
 * @param defaultState - Initial state value or function to compute it
 * @returns A tuple of [state, setState] similar to useState, with bidirectional sync to ChatGPT
 * 
 * @example
 * ```tsx
 * interface MyState {
 *   count: number;
 *   user: string;
 * }
 * 
 * const [state, setState] = useWidgetState<MyState>({ count: 0, user: "guest" });
 * 
 * const increment = () => {
 *   setState(prev => ({ ...prev, count: prev.count + 1 }));
 * };
 * ```
 */
export function useWidgetState<T extends UnknownObject>(
  defaultState?: T | (() => T | null) | null
): readonly [T | null, (state: SetStateAction<T | null>) => void] {
  const widgetStateFromWindow = useOpenAIGlobal("widgetState") as T;

  const [widgetState, _setWidgetState] = useState<T | null>(() => {
    if (widgetStateFromWindow != null) {
      return widgetStateFromWindow;
    }
    return typeof defaultState === "function"
      ? defaultState()
      : defaultState ?? null;
  });

  useEffect(() => {
    _setWidgetState(widgetStateFromWindow);
  }, [widgetStateFromWindow]);

  const setWidgetState = useCallback(
    (state: SetStateAction<T | null>) => {
      _setWidgetState((prevState) => {
        const newState = typeof state === "function" ? state(prevState) : state;

        if (newState != null) {
          window.openai.setWidgetState(newState);
        }

        return newState;
      });
    },
    [window.openai.setWidgetState]
  );

  return [widgetState, setWidgetState] as const;
}
