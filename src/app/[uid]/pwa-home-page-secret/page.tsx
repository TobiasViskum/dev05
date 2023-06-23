import { getProfileData, getAppData } from "@/lib/db";
import { SectionHolder, SearchSection } from "@/components/page-home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage({ params }: ViskumAppParams) {
  const uid = params.uid;
  const profileData = await getProfileData(uid);
  const appData = profileData && (await getAppData(profileData));

  const strProfileData = JSON.stringify(profileData);
  const strAppData = JSON.stringify(appData);

  return (
    <main className="grid grid-rows-3-min-content justify-center gap-y-6 transition-grid">
      <SearchSection profileData={strProfileData} />
      <SectionHolder strProfileData={strProfileData} strAppData={strAppData} />
    </main>
  );
}
