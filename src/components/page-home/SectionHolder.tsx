"use client";
import { FavoritesSection, TabsSection } from "@/components/page-home";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  strProfileData: string;
  strAppData: string;
}

export default function SectionHolder({ strProfileData, strAppData }: Props) {
  const appData: AppData[] = JSON.parse(strAppData);
  const [profileData, setProfileData] = useState<ProfileData>(
    JSON.parse(strProfileData)
  );
  const [oldFavorites, setOldFavorites] = useState<{
    [key: string]: string;
  }>({});

  function instantFavoriteUpdate(
    newFavorites: Favorites,
    action: string,
    passedOldFavorites?: Favorites
  ) {
    const strNewFavorites = JSON.stringify(newFavorites);
    const strOldFavorites = JSON.stringify(oldFavorites);
    if (action === "set" && passedOldFavorites) {
      setOldFavorites(passedOldFavorites);
      let newProfileData = profileData;
      newProfileData.favorites = newFavorites;
      setProfileData(newProfileData);
    } else if (action === "check") {
      if (strNewFavorites !== strOldFavorites) {
        let newProfileData = profileData;
        newProfileData.favorites = oldFavorites;
        setProfileData(newProfileData);
      }
    }
  }

  return (
    <>
      <FavoritesSection
        profileData={profileData}
        appData={appData}
        instantFavoriteUpdate={instantFavoriteUpdate}
      />
      <TabsSection
        profileData={profileData}
        appData={appData}
        instantFavoriteUpdate={instantFavoriteUpdate}
      />
    </>
  );
}
