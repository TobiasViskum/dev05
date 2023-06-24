import { getProfileData, getAppData } from "@/lib/db";
import { ProfileHolder, Statusbar, MostVisited } from "@/components/page-start";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import BrowserView from "@/components/page-start/BrowserView";

export const metadata: Metadata = {
  title: "Start",
};

export default async function page({ params }: ViskumAppParams) {
  const uid = params.uid;

  const profileData = await getProfileData(uid);

  if (profileData === null) {
    redirect("/");
  }

  const appData = await getAppData(profileData);

  const strProfileData = JSON.stringify(profileData);
  const strAppData = JSON.stringify(appData);

  return (
    <main className="grid min-w-small justify-center">
      <div className="hidden flex-col items-center standalone:touch:flex">
        <ProfileHolder strProfileData={strProfileData} />
        <Statusbar />
      </div>
      <div className="hidden w-full standalone:touch:block">
        <MostVisited profileData={strProfileData} appData={strAppData} />
      </div>
      <div className="w-full min-w-small standalone:touch:hidden">
        <BrowserView profileData={profileData} appData={appData} />
      </div>
    </main>
  );
}
