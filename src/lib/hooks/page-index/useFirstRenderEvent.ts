"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function useFirstRenderEvent({
  updateHeader,
}: {
  updateHeader: (newState: boolean, action: string) => void;
}) {
  const path = usePathname();
  let onScroll: any = useRef();

  useEffect(() => {
    const splitPath = path.split("/");
    const documentElement = document.documentElement;

    function handleHeaderChange() {
      if (splitPath[2] === "home") {
        if (documentElement.scrollTop >= 16) {
          updateHeader(true, "header");
          if (documentElement.scrollTop >= 48) {
            updateHeader(true, "title");
          }
        }
        if (documentElement.scrollTop < 48) {
          updateHeader(false, "title");
          if (documentElement.scrollTop < 16) {
            updateHeader(false, "header");
          }
        }
      } else if (splitPath[2] === "fitness") {
        updateHeader(true, "title");
        if (documentElement.scrollTop >= 24) {
          updateHeader(true, "header");
        } else {
          updateHeader(false, "header");
        }
      } else if (splitPath[2] === "settings") {
        if (documentElement.scrollTop >= 24) {
          updateHeader(true, "header");
          if (documentElement.scrollTop >= 56) {
            updateHeader(true, "title");
          }
        }
        if (documentElement.scrollTop < 56) {
          updateHeader(false, "title");
          if (documentElement.scrollTop < 24) {
            updateHeader(false, "header");
          }
        }
      }
    }

    document.removeEventListener("scroll", onScroll.current);

    onScroll.current = function handleScroll() {
      handleHeaderChange();
    };
    handleHeaderChange();

    document.addEventListener("scroll", onScroll.current);
  }, [updateHeader, path]);
}
