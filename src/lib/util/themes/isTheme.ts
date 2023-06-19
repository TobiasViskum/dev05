"use client";

import renderTheme from "./renderTheme";

export default function isTheme(
  theme: "blue" | "dark",
  profileData: ProfileData | null
) {
  if (profileData) {
    return theme === profileData.color_theme;
  }
  return false;
}

export function validateTheme(profileData: ProfileData | null) {
  if (profileData && typeof document !== "undefined") {
    const clientTheme = localStorage.getItem("theme");
    if (clientTheme !== profileData.color_theme) {
      //making sure they are synced
      localStorage.setItem("theme", profileData.color_theme);
      renderTheme(profileData.color_theme);
    }
  }
  return;
}
