"use client";

import Image from "next/image";
import { arrow } from "@/assets/images";
import { appImages } from "@/lib/util";
import { Box } from "@/components/global";
import TabsButton from "./TabsButton";
import { twJoin, twMerge } from "tailwind-merge";
import { isTheme } from "@/lib/util/themes";
import { useState } from "react";
import Link from "next/link";

interface Props {
  appData: AppData;
  profileData: ProfileData;
  instantFavoriteUpdate: (
    newFavorites: Favorites,
    action: string,
    passedOldFavorites?: Favorites
  ) => void;
}

export default function TabsCard({
  appData,
  profileData,
  instantFavoriteUpdate,
}: Props) {
  const [isBorderActive, setIsBorderActive] = useState(false);
  const appImageData = appImages[appData.name_id];

  function handleNavigate() {
    fetch("/api/update-most-visited", {
      method: "POST",
      body: JSON.stringify({
        profileData: profileData,
        name_id: appData.name_id,
      }),
    });
  }

  function handleHover(e: React.MouseEvent<HTMLDivElement>, disable?: boolean) {
    const target = e.target as HTMLElement;

    if (disable !== true) {
      if (target.ariaLabel !== "hideBorder") {
        setIsBorderActive(true);
      } else {
        setIsBorderActive(false);
      }
    } else {
      setIsBorderActive(false);
    }
  }

  return (
    <Link href={appData.href} className="group" onClick={handleNavigate}>
      <Box
        onMouseMove={(e) => handleHover(e)}
        onMouseLeave={(e) => handleHover(e, true)}
        profileData={profileData}
        className={twMerge(
          "flex items-center gap-x-3 overflow-hidden p-1.5",
          isBorderActive ? "dt:border-active" : ""
        )}
      >
        <div
          className="grid aspect-square h-12 w-12 place-items-center rounded-me"
          style={{ backgroundColor: appData.color }}
        >
          <Image
            priority
            src={appImageData.image}
            alt="icon"
            style={{
              height: `${appImageData.size}%`,
              width: `${appImageData.size}%`,
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{appData.name}</h3>
          <p className="text-second">{appData.category}</p>
        </div>
        <div className="ml-auto mr-2.5 flex items-center gap-x-4 max-tn:gap-x-0">
          <TabsButton
            profileData={profileData}
            appData={appData}
            instantFavoriteUpdate={instantFavoriteUpdate}
          />
          <div className="ml-auto flex aspect-square h-8 w-8 items-center justify-end dt:hidden">
            <Image
              priority
              src={arrow}
              alt="icon"
              className={twJoin(
                "h-half w-half",
                isTheme("blue", profileData) ? "" : "image-gray"
              )}
            />
          </div>
        </div>
      </Box>
    </Link>
  );
}
