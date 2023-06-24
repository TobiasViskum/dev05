import TabsCard from "./TabsCard";

function findTabs(
  appData: AppData[],
  profileData: ProfileData,
  instantFavoriteUpdate?: (newFavorites: Favorites, action: string) => void
) {
  const favorites = profileData.favorites;

  const sortedApps = appData.sort((a, b) => {
    const isFavoriteA =
      favorites == null ? false : favorites[a.name_id] ? true : false;
    const isFavoriteB =
      favorites == null ? false : favorites[b.name_id] ? true : false;

    return isFavoriteA === isFavoriteB ? 0 : isFavoriteA ? 1 : -1;
  });

  return sortedApps.map((app, index) => {
    return (
      <TabsCard
        profileData={profileData}
        key={index}
        strApp={JSON.stringify(app)}
        instantFavoriteUpdate={instantFavoriteUpdate}
      />
    );
  });
}

interface Props {
  profileData: ProfileData;
  appData: AppData[];
  instantFavoriteUpdate?: (
    newFavorites: Favorites,
    action: string,
    passedOldFavorites?: Favorites
  ) => void;
}

export default function TabsSection({
  profileData,
  appData,
  instantFavoriteUpdate,
}: Props) {
  const result = findTabs(appData, profileData, instantFavoriteUpdate);

  return (
    <div className="overflow-hidden">
      <h2 className="text-2xl font-semibold">Tabs</h2>
      <div className="mt-2 grid grid-cols-auto-min-max-1 gap-3">{result}</div>
    </div>
  );
}
