import { Metadata } from "next";
import { getProfileData } from "@/lib/db";
import { AccountSettings } from "@/components/page-settings";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function MaxPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  const profileData = await getProfileData(uid);

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-semibold">Settings</h1>
      <div className="flex flex-col gap-y-4">
        <h2 className="mb-2 text-3xl text-second">General</h2>
        <div className="flex flex-col gap-y-2">
          <h2 className="mb-2 text-3xl text-second">Account</h2>
          <AccountSettings />
        </div>
      </div>
    </div>
  );
}
