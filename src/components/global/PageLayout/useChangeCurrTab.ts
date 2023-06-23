import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useChangeCurrTab(
  setCurrTab: React.Dispatch<React.SetStateAction<string[]>>
) {
  const path = usePathname();

  return useEffect(() => {
    const splitPath = path.split("/").filter((item: string) => {
      return item.length > 0;
    });

    const uidOrFirstPath = splitPath[0];
    const length = splitPath.length;

    if (length === 0) {
      setCurrTab(["info", ""]);
    } else if (length === 1) {
      if (uidOrFirstPath === "login") {
        setCurrTab(["login", uidOrFirstPath]);
      } else {
        setCurrTab(["start", uidOrFirstPath]);
      }
    } else if (length >= 2) {
      if (splitPath[1] === "pwa-home-page-secret") {
        setCurrTab(["home", uidOrFirstPath]);
      } else {
        setCurrTab([splitPath[1], uidOrFirstPath]);
      }
    }
  }, [path, setCurrTab]);
}
