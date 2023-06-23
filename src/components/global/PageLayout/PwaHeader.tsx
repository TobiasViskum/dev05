import { hooks } from "@/lib/hooks/page-index";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  GoBackButton,
  HeaderTitle,
  ProfileIcon,
  SettingsButton,
  StartShadow,
} from "./HeaderContent";

export default function PwaHeader() {
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
      if (splitPathname[2].toLowerCase() === "pwa-home-page-secret") {
        setTitle("home");
      } else setTitle(splitPathname[2].toLowerCase());
    }
  }, [path]);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches &&
    window.matchMedia("(hover: none)").matches
  ) {
    hooks.useFirstRenderEvent({ updateHeader });
  }

  return (
    <>
      <header
        className={twMerge(
          "visible flex w-full h-full min-w-[272px] items-center justify-center border-0 border-b border-solid border-first bg-first backdrop-blur-md transition-colors",
          title === "start"
            ? "invisible"
            : isHeaderActive
            ? "border-second bg-first-transparent"
            : ""
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
      <GoBackButton title={title} splitPath={splitPath} />
      <ProfileIcon isHeaderTitleActive={isHeaderTitleActive} title={title} />
      <SettingsButton splitPath={splitPath} />
    </>
  );
}
