"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
export function RouteFocus() {
  const path = usePathname();
  const previous = useRef(path);
  useEffect(() => {
    if (previous.current !== path) {
      document
        .querySelector<HTMLElement>("#main-content")
        ?.focus({ preventScroll: true });
      previous.current = path;
    }
  }, [path]);
  return null;
}
