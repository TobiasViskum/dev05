import FavoritesCard from "./FavoritesCard";

function findFavorites(
  appData: AppData[],
  profileData: ProfileData,
  instantFavoriteUpdate: (newFavorites: Favorites, action: string) => void
) {
  let hasFoundFavorite = false;
  if (profileData.favorites === null) {
    return <p className="text-second">You don{"'"}t have any favorites yet!</p>;
  } else {
    return appData.map((app, index) => {
      if (
        profileData.favorites &&
        profileData.favorites[app.name_id] != undefined
      ) {
        hasFoundFavorite = true;
        return (
          <FavoritesCard
            key={index}
            appData={app}
            profileData={profileData}
            instantFavoriteUpdate={instantFavoriteUpdate}
          />
        );
      }
      if (appData.length == index + 1 && hasFoundFavorite == false) {
        return (
          <p key={index} className="text-second">
            You don{"'"}t have any favorites yet!
          </p>
        );
      }
    });
  }
}

interface Props {
  profileData: ProfileData;
  appData: AppData[];
  instantFavoriteUpdate: (newFavorites: Favorites, action: string) => void;
}

export default function FavoritesSection({
  profileData,
  appData,
  instantFavoriteUpdate,
}: Props) {
  const result = findFavorites(appData, profileData, instantFavoriteUpdate);

  return (
    <div className="overflow-hidden">
      <h2 className="text-2xl font-semibold">Favorites</h2>
      <div className="mt-2 grid grid-cols-auto-min-max-1 gap-3">{result}</div>
    </div>
  );
}
