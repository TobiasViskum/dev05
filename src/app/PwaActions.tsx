"use client";
import { useEffect } from "react";

function isPWA() {
  const isPWA = window.matchMedia("(display-mode: standalone)").matches;
  return isPWA;
}
function isMobile() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return isMobile;
}

export default function PwaActions() {
  useEffect(() => {
    const viewport = document.querySelector("meta[name=viewport]");
    const documentStyle = document.documentElement.style;

    if (isPWA() && viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
      );
      documentStyle.setProperty("--touch-actions", "pan-y");
      documentStyle.setProperty("--user-select", "none");
    }
  }, []);

  return <></>;
}
