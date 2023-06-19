"use client";

import { rocket, home } from "@/assets/images";
import ContentItem from "./ContentItem";

export default function HomeContent({
  currTab,
  profileData,
}: {
  currTab: string[];
  profileData: ProfileData | null;
}) {
  return (
    <>
      <ContentItem
        profileData={profileData}
        destPath={`/${currTab[1]}`}
        image={rocket}
        text="Start"
      />
      <ContentItem
        profileData={profileData}
        destPath={`/${currTab[1]}/home`}
        image={home}
        text="Home"
        imageSize="h-3/4 w-3/4"
      />
    </>
  );
}
