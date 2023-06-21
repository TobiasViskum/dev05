"use client";

import { twMerge } from "tailwind-merge";
import { hooks } from "@/lib/hooks/page-index";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useState } from "react";
import {
  GoBackButton,
  HeaderTitle,
  ProfileIcon,
  SettingsButton,
  StartShadow,
} from "./HeaderContent";
import { isTheme } from "@/lib/util/themes";

export default function Header({
  profileData,
}: {
  profileData: ProfileData | null;
}) {
  const path = usePathname();
  const splitPath = path.split("/");

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isHeaderTitleActive, setIsHeaderTitleActive] = useState(false);
  const [title, setTitle] = useState("");

  function toggleSearchbarHeadingsEvent(newState: boolean) {
    const event = new CustomEvent("toggleSearchbarHeadings", {
      detail: { newState: newState },
    });
    document.dispatchEvent(event);
  }

  function updateHeader(newState: boolean, action: string) {
    if (action === "header") {
      setIsHeaderActive(newState);
    } else if (action === "title") {
      if (newState === !isHeaderTitleActive) {
        toggleSearchbarHeadingsEvent(newState);
      }
      setIsHeaderTitleActive(newState);
    }
  }

  useEffect(() => {
    const splitPathname = path.split("/");
    if (splitPathname.length == 2) {
      setTitle("start");
      setIsHeaderTitleActive(false);
    } else if (splitPathname.length >= 3) {
      setTitle(splitPathname[2].toLowerCase());
    }
  }, [path]);

  hooks.useFirstRenderEvent({ updateHeader });

  return (
    <>
      <div
        className="fixed left-0 top-0 z-50 w-full min-w-small"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <header
          className={twMerge(
            "visible flex h-12 w-full min-w-[272px] items-center justify-center border-0 border-b border-solid border-first bg-first backdrop-blur-md transition-colors",
            title === "start"
              ? "invisible"
              : isHeaderActive
              ? "border-second bg-first-transparent"
              : "",
            isTheme("blue", profileData) ? "border-none" : ""
          )}
        >
          <nav className="flex items-center justify-center ">
            <HeaderTitle
              isHeaderTitleActive={isHeaderTitleActive}
              title={title}
            />
          </nav>
        </header>
        <StartShadow title={title} />
        <GoBackButton
          title={title}
          splitPath={splitPath}
          profileData={profileData}
        />
        <ProfileIcon isHeaderTitleActive={isHeaderTitleActive} title={title} />
        <SettingsButton splitPath={splitPath} profileData={profileData} />
      </div>
      <div className="mb-16" />
    </>
  );
}
