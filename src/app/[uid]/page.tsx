import { getProfileData, getAppData } from "@/lib/db";
import { ProfileHolder, Statusbar, MostVisited } from "@/components/page-start";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start",
};

export default async function page({ params, searchParams }: ViskumAppParams) {
  const uid = params.uid;

  const profileData = await getProfileData(uid);
  const appData = profileData && (await getAppData(profileData));

  const strProfileData = JSON.stringify(profileData);
  const strAppData = JSON.stringify(appData);

  return (
    <>
      <main className="grid min-w-small justify-center">
        <div className="flex flex-col items-center">
          <ProfileHolder profileData={strProfileData} />
          <Statusbar />
        </div>
        <MostVisited profileData={strProfileData} appData={strAppData} />
      </main>
    </>
  );
}
