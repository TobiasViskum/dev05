"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Props {
  changeGridRows: (action: "small device" | "big device") => void;
}

type HandleResize = () => void;

export function useExerciseGroupGrid({ changeGridRows }: Props) {
  let onResize = useRef<HandleResize | null>(null);
  const path = usePathname();

  return useEffect(() => {
    if (window.innerWidth >= 564) {
      changeGridRows("big device");
    } else {
      changeGridRows("small device");
    }
    if (onResize.current) {
      window.removeEventListener("resize", onResize.current);
    }
    onResize.current = function handleResize() {
      if (window.innerWidth >= 564) {
        changeGridRows("big device");
      } else {
        changeGridRows("small device");
      }
    };
    window.addEventListener("resize", onResize.current);
  }, [changeGridRows, path]);
}
