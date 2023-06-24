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
        <div className="flex max-w-small gap-x-4 overflow-hidden">
          <div className="hidden aspect-square h-32 w-32 rounded-full border-4 border-white tn:block">
            <Image
              priority
              src={profileTobias}
              alt="profileIcon"
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-y-2">
            <h1 className="break-keep text-4xl font-bold">
              {profileData?.name} {profileData?.last_name}
            </h1>
            <p className="line-clamp-2 text-second vsm:line-clamp-3">
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
