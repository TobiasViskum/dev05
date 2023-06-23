"use client";
import Image from "next/image";
import { star_full, star_outline } from "@/assets/images";
import { twJoin } from "tailwind-merge";
import { isTheme } from "@/lib/util/themes";

interface Props {
  profileData: ProfileData;
  appData: AppData;
  instantFavoriteUpdate?: (
    newFavorites: Favorites,
    action: string,
    passedOldFavorites?: Favorites
  ) => void;
}

export default function TabsButton({
  profileData,
  appData,
  instantFavoriteUpdate,
}: Props) {
  const name_id = appData.name_id;
  const favorites = profileData.favorites;
  const isFavorite =
    favorites == null ? false : favorites[name_id] ? true : false;
  const newState = !isFavorite;

  if (instantFavoriteUpdate === undefined) return <></>;

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (instantFavoriteUpdate) {
      e.preventDefault();
      e.stopPropagation();
      if (favorites === null) {
        instantFavoriteUpdate({}, "set");
      } else {
        if (newState === false) {
          let oldFavorites = structuredClone(favorites);
          delete favorites[name_id];
          instantFavoriteUpdate(favorites, "set", oldFavorites);
        } else if (newState) {
          let oldFavorites = structuredClone(favorites);
          favorites[name_id] = name_id;
          instantFavoriteUpdate(favorites, "set", oldFavorites);
        }
      }

      const result: Response = await fetch("/api/update-favorite", {
        method: "POST",
        body: JSON.stringify({
          uid: profileData.uid,
          newState: newState,
          name_id: appData.name_id,
          favorites: profileData.favorites,
        }),
      });
      const newFavorites = (await result.json()).result;
      instantFavoriteUpdate(newFavorites, "check");
    }
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
          src={isFavorite ? star_full : star_outline}
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
