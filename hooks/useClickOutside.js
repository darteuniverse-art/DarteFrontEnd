import { useEffect } from "react";

export default function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      const el = ref?.current;
      if (!el) return;
      // If click is inside the element, ignore
      if (el.contains(event.target)) return;
      handler?.(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}
