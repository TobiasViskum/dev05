"use client";
import { useEffect } from "react";
import { renderTheme } from "@/lib/util/themes";
import { validateTheme } from "@/lib/util/themes";

function isPWA() {
  const isPWA = window.matchMedia("(display-mode: standalone)").matches;
  return isPWA;
}
function isMobile() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return isMobile;
}

export default function PwaActions({
  profileData,
}: {
  profileData: ProfileData | null;
}) {
  useEffect(() => {
    const viewport = document.querySelector("meta[name=viewport]");
    const documentStyle = document.documentElement.style;

    const theme = localStorage.getItem("theme");
    if (theme === null) {
      localStorage.setItem("theme", "dark");
    } else if (theme && profileData) {
      if (theme !== profileData.color_theme) {
        localStorage.setItem("theme", profileData.color_theme);
        renderTheme(profileData.color_theme);
      } else {
        renderTheme(profileData.color_theme);
      }
    }

    if (isMobile() && isPWA() && viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
      );
      documentStyle.setProperty("--touch-actions", "pan-y");
      documentStyle.setProperty("--user-select", "none");
    }
  }, []);

  return <></>;
}
