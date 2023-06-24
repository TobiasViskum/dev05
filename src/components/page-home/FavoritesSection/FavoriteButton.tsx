"use client";
import Image from "next/image";
import { star_full } from "@/assets/images";
import { useAppSelector } from "@/store/useClient";

interface Props {
  app: AppData;
  profileData: ProfileData;
  instantFavoriteUpdate?: (
    newFavorites: Favorites,
    action: string,
    passedOldFavorites?: Favorites
  ) => void;
}

export default function FavoriteButton({
  app,
  profileData,
  instantFavoriteUpdate,
}: Props) {
  const name_id = app.name_id;
  const favorites = profileData.favorites;

  if (instantFavoriteUpdate === undefined) return <></>;

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (instantFavoriteUpdate) {
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
          name_id: app.name_id,
          favorites: favorites,
        }),
      });
      const newFavorites = (await response.json()).result;
      instantFavoriteUpdate(newFavorites, "check");
    }
  }
  return (
    <>
      <button
        aria-label="hideBorder"
        className="hidden aspect-square h-8 w-8 p-2 standalone:touch:block"
        onClick={(e) => handleClick(e)}
      >
        <Image
          aria-label="hideBorder"
          priority
          src={star_full}
          alt="icon"
          className="image-blue h-full w-full"
        />
      </button>
    </>
  );
}
