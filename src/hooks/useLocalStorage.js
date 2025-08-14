import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return initialValue;
      // Try to JSON-parse; fall back to raw string
      try {
        return JSON.parse(stored);
      } catch {
        return stored;
      }
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore =
        typeof state === "string" ? state : JSON.stringify(state);
      localStorage.setItem(key, valueToStore);
    } catch {
      // Silently ignore write errors (e.g., private mode quotas)
    }
  }, [key, state]);

  return [state, setState];
}

