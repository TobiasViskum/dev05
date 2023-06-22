"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { HomeContent, StartContent, FitnessContent } from "./FooterContent";
import { twMerge, twJoin } from "tailwind-merge";
import { isTheme } from "@/lib/util/themes";

export default function Footer({
  profileData,
}: {
  profileData: ProfileData | null;
}) {
  const path = usePathname();

  const [currTab, setCurrTab] = useState(["", path.split("/")[1]]);

  useEffect(() => {
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
      if (uidOrFirstPath !== "login") {
        setCurrTab([splitPath[1], uidOrFirstPath]);
      } else if (uidOrFirstPath === "login") {
        setCurrTab(["login", splitPath[1]]);
      }
    }
  }, [path]);

  const tw = "w-full min-w-small max-w-small justify-items-center";

  return (
    <>
      <footer
        className={twJoin(
          "fixed bottom-0 left-0 z-20 flex h-20 w-[100svw] min-w-[272px] justify-center bg-second-transparent backdrop-blur-xl",
          isTheme("blue", profileData)
            ? ""
            : " border-0 border-t border-solid border-second"
        )}
      >
        {currTab[0] === "info" || currTab[0] === "login" ? (
          <div className={twMerge(tw, "flex justify-evenly")}>
            <StartContent currTab={currTab} profileData={profileData} />
          </div>
        ) : currTab[0] === "home" || currTab[0] === "start" ? (
          <div className={twMerge(tw, "flex justify-evenly")}>
            <HomeContent currTab={currTab} profileData={profileData} />
          </div>
        ) : currTab[0] === "fitness" ? (
          <div className={twMerge(tw, "grid grid-cols-4 tn:grid-cols-5")}>
            <FitnessContent currTab={currTab} profileData={profileData} />
          </div>
        ) : (
          ""
        )}
      </footer>
      <div className="mt-32"></div>
    </>
  );
}
