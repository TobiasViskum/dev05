import MostVisitedCard from "./MostVisitedCard";
import { findMostViewed } from "@/lib/util";
import { store } from "@/store";

export default function MostVisited() {
  const profileData = store.getState().userData.profileData;
  const appData = store.getState().userData.appData;

  const topThreeMostViewed: { [key: string]: number }[] = findMostViewed(
    profileData,
    appData
  );

  function getMostViewed() {
    return topThreeMostViewed.map((obj, index) => {
      const key = Object.keys(obj)[0];
      return appData.map((app) => {
        if (app.name_id === key) {
          return (
            <MostVisitedCard
              key={index}
              profileData={profileData}
              appData={app}
            />
          );
        }
      });
    });
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Recommended</h1>
      <div className="mt-2 grid grid-cols-auto-min-max-1 gap-3">
        {getMostViewed()}
      </div>
    </>
  );
}
