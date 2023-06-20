import { Metadata } from "next";
import { getProfileData } from "@/lib/db";
import { ColorThemes } from "@/components/page-settings";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function MaxPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  const profileData = await getProfileData(uid);

  if (profileData === null) return <></>;
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-semibold">Settings</h1>
      <div className="flex flex-col gap-y-4">
        <div>
          <h2 className="mb-2 text-2xl text-second">Color Themes</h2>
          <ColorThemes profileData={profileData} />
        </div>
        <div>
          <h2 className="mb-2 text-2xl text-second">Fitness</h2>
          <ColorThemes profileData={profileData} />
        </div>
      </div>
    </div>
  );
}
