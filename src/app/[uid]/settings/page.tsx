import { Metadata } from "next";
import { getProfileData } from "@/lib/db";
import { AccountSettings, ColorThemes } from "@/components/page-settings";

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
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl text-second mb-2">General</h2>
          <div>
            <h3 className="mb-2 text-xl text-first">Color Themes</h3>
            <ColorThemes profileData={profileData} />
          </div>
          <div>
            <h3 className="mb-2 text-xl text-first">Color Themes</h3>
            <ColorThemes profileData={profileData} />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl text-second mb-2">Fitness</h2>
          <div>
            <h3 className="mb-2 text-xl text-first">Color Themes</h3>
            <ColorThemes profileData={profileData} />
          </div>
          <div>
            <h3 className="mb-2 text-xl text-first">Color Themes</h3>
            <ColorThemes profileData={profileData} />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl text-second mb-2">Account</h2>
          <AccountSettings />
        </div>
      </div>
    </div>
  );
}
