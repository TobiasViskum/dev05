"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { HomeContent, StartContent, FitnessContent } from "./FooterContent";
import { twMerge, twJoin } from "tailwind-merge";
import BrowserBottomShadow from "./FooterContent/BrowserBottomShadow";
import useChangeCurrTab from "./useChangeCurrTab";

export default function Footer() {
  const path = usePathname();
  const [currTab, setCurrTab] = useState(["", path.split("/")[1]]);

  useChangeCurrTab(setCurrTab);

  const tw = "w-full min-w-small max-w-small justify-items-center";

  if (path === "/") {
    return <></>;
  }

  return (
    <>
      <footer
        className={twJoin(
          "fixed bottom-0 left-0 z-20 hidden h-20 w-[100svw] min-w-[272px] justify-center bg-second-transparent backdrop-blur-xl standalone:touch:flex",
          "border-0 border-t border-solid border-second"
        )}
      >
        {currTab[0] === "home" || currTab[0] === "start" ? (
          <div className={twMerge(tw, "flex justify-evenly")}>
            <HomeContent currTab={currTab} />
          </div>
        ) : currTab[0] === "fitness" ? (
          <div className={twMerge(tw, "grid grid-cols-4 tn:grid-cols-5")}>
            <FitnessContent currTab={currTab} />
          </div>
        ) : (
          ""
        )}
      </footer>

      <div className="mt-32" />
      <BrowserBottomShadow />
    </>
  );
}
