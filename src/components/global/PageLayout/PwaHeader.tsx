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
    const lastPathSection = splitPath.slice(-1)[0];
    if (splitPath.length == 2) {
      setTitle("start");
      setIsHeaderTitleActive(false);
    } else if (splitPath.length >= 3) {
      if (splitPath[2].toLowerCase() === "pwa-home-page-secret") {
        setTitle("home");
      } else if (!isNaN(Number(lastPathSection))) {
        setTitle("Edit");
      } else setTitle(splitPath[2].toLowerCase());
    }
  }, [splitPath]);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches &&
    window.matchMedia("(hover: none)").matches
  ) {
    hooks.useFirstRenderEvent({ updateHeader });
  }

  return (
    <div className="fixed left-0 top-0 h-12 w-full">
      <div
        className={twMerge(
          "visible flex h-full w-full min-w-[272px] items-center justify-center border-0 border-b border-solid border-first bg-first backdrop-blur-md transition-colors",
          title === "start"
            ? "invisible"
            : isHeaderActive
            ? "border-second bg-first-transparent"
            : ""
        )}
      >
        <nav className="flex max-w-6xl items-center justify-center">
          <HeaderTitle
            isHeaderTitleActive={isHeaderTitleActive}
            title={title}
          />
        </nav>
      </div>
      <StartShadow title={title} />
      <GoBackButton title={title} />
      <ProfileIcon isHeaderTitleActive={isHeaderTitleActive} title={title} />
      <SettingsButton splitPath={splitPath} />
    </div>
  );
}
