"use client";
import Image from "next/image";
import { star_full } from "@/assets/images";
import { twJoin } from "tailwind-merge";
import { isTheme } from "@/lib/util/themes";

interface Props {
  profileData: ProfileData;
  appData: AppData;
  instantFavoriteUpdate: (
    newFavorites: Favorites,
    action: string,
    passedOldFavorites?: Favorites
  ) => void;
}

export default function FavoriteButton({
  profileData,
  appData,
  instantFavoriteUpdate,
}: Props) {
  const name_id = appData.name_id;
  const favorites = profileData.favorites;

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (favorites === null) {
      instantFavoriteUpdate({}, "set");
    } else {
      let oldFavorites = structuredClone(favorites);
      delete favorites[name_id];

      instantFavoriteUpdate(favorites, "set", oldFavorites);
    }

    const response: Response = await fetch("/api/update-favorite", {
      method: "POST",
      body: JSON.stringify({
        uid: profileData.uid,
        newState: false,
        name_id: appData.name_id,
        favorites: favorites,
      }),
    });
    const newFavorites = (await response.json()).result;
    instantFavoriteUpdate(newFavorites, "check");
  }
  return (
    <>
      <button
        aria-label="hideBorder"
        className="aspect-square h-8 w-8 p-2 hidden standalone:touch:block"
        onClick={(e) => handleClick(e)}
      >
        <Image
          aria-label="hideBorder"
          priority
          src={star_full}
          alt="icon"
          className={twJoin(
            "h-full w-full",
            isTheme("blue", profileData) ? "image-light-blue" : "image-blue"
          )}
        />
      </button>
    </>
  );
}
