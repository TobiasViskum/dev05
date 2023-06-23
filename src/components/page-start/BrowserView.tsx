import { profileTobias } from "@/assets/images";
import Image from "next/image";
import SearchBar from "../page-home/SearchSection/SearchBar";
import { FavoritesSection } from "../page-home";
import { TabsSection } from "../page-home";

export default function BrowserView({
  profileData,
  appData,
}: {
  profileData: ProfileData;
  appData: AppData[];
}) {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4 max-w-small overflow-hidden">
          <div className="hidden tn:block h-32 w-32 aspect-square rounded-full border-4 border-white">
            <Image
              priority
              src={profileTobias}
              alt="profileIcon"
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="flex flex-col items-start gap-y-2 justify-center">
            <h1 className="text-4xl font-bold break-keep">
              {profileData?.name} {profileData?.last_name}
            </h1>
            <p className="text-second line-clamp-2 vsm:line-clamp-3">
              Tell others about yourself or what you are up to!
            </p>
          </div>
        </div>
        <SearchBar profileData={profileData} />
        <div>
          <FavoritesSection profileData={profileData} appData={appData} />
        </div>
        <div>
          <TabsSection profileData={profileData} appData={appData} />
        </div>
      </div>
    </>
  );
}