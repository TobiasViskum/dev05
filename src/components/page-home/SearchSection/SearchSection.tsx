"use client";

import Image from "next/image";
import { profileTobias } from "@/assets/images";
import SearchBar from "./SearchBar";
import { useEffect, useRef } from "react";

interface Props {
  profileData: string;
}

export default function SearchSection(props: Props) {
  const profileData: ProfileData = JSON.parse(props.profileData);

  const iconRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    document.addEventListener("toggleSearchbarHeadings", ((
      e: CustomEvent<{ newState: boolean }>
    ) => {
      if (iconRef.current && titleRef.current) {
        if (e.detail.newState) {
          iconRef.current.style.opacity = "0";
          titleRef.current.style.opacity = "0";
        } else {
          iconRef.current.style.opacity = "1";
          titleRef.current.style.opacity = "1";
        }
      }
    }) as EventListener);
  }, []);

  return (
    <div
      className="grid grid-rows-2-min-content gap-y-2 overflow-hidden transition-grid"
      id="searchSection"
    >
      <div className="flex items-center gap-x-4 overflow-hidden">
        <div
          className="aspect-square h-10 w-10 rounded-full transition-opacity duration-300"
          id="profileIcon"
          ref={iconRef}
        >
          <Image
            priority
            src={profileTobias}
            alt="profile"
            className="h-full w-full rounded-full"
          />
        </div>
        <h1
          className="text-3xl font-bold transition-opacity duration-300"
          id="homeTitle"
          ref={titleRef}
        >
          Home
        </h1>
      </div>
      <div className="flex items-center overflow-hidden">
        <SearchBar />
      </div>
    </div>
  );
}
