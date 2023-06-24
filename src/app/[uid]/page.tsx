import { ProfileHolder, Statusbar, MostVisited } from "@/components/page-start";
import { Metadata } from "next";
import BrowserView from "@/components/page-start/BrowserView";
import { getAppData, getProfileData } from "@/lib/db";

export const metadata: Metadata = {
  title: "Start",
};

export default async function page({ params }: ViskumAppParams) {
  const uid = params.uid;
  const profileData = await getProfileData(uid);
  const appData = await getAppData(profileData);

  return (
    <main className="grid min-w-small justify-center">
      <div className="hidden flex-col items-center standalone:touch:flex">
        <ProfileHolder profileData={profileData} />
        <Statusbar />
      </div>
      <div className="hidden w-full standalone:touch:block">
        <MostVisited profileData={profileData} appData={appData} />
      </div>
      <div className="w-full min-w-small standalone:touch:hidden">
        <BrowserView profileData={profileData} appData={appData} />
      </div>
    </main>
  );
}
