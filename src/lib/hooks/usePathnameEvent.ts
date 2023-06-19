"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
  onPathChange: (str: string) => void;
}
export default function usePathnameEvent(props: Props) {
  const pathname = usePathname();
  const onPathChange = props.onPathChange;

  useEffect(() => {
    const splitPathname = pathname.split("/");
    if (splitPathname.length == 2) {
      onPathChange("start");
    } else if (splitPathname.length == 3) {
      onPathChange(splitPathname[2].toLowerCase());
    }
  }, [pathname, onPathChange]);
  return;
}
