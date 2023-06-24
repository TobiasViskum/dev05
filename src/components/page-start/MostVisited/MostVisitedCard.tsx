"use client";

import Image from "next/image";
import { Box } from "@/components/global";
import { arrow } from "@/assets/images";
import { appImages } from "@/lib/util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/useClient";

export default function MostVisitedCard({ app }: { app: AppData }) {
  const path = usePathname();
  const profileData = useAppSelector((state) => state.userData.profileData);

  const appImageData = appImages[app.name_id];

  function handleNavigate() {
    fetch("/api/update-most-visited", {
      method: "POST",
      body: JSON.stringify({
        profileData: profileData,
        name_id: app.name_id,
      }),
    });
  }

  return (
    <Link
      href={[app.href, "?prev=", path].join("")}
      onClick={handleNavigate}
      className="group"
    >
      <Box className="flex items-center gap-x-3 overflow-hidden p-1.5 dt:group-hover:border-active">
        <div
          className="grid aspect-square h-8 w-8 place-items-center rounded-me"
          style={{ backgroundColor: app.color }}
        >
          <Image
            priority
            src={appImageData.image}
            alt="icon"
            style={{
              height: `${appImageData.size}%`,
              width: `${appImageData.size}%`,
            }}
          />
        </div>
        <h3 className="text-lg font-semibold">{app.name}</h3>
        <div className="max-tn:gap-x-0 ml-auto mr-2 flex items-center gap-x-4">
          <div className="ml-auto flex aspect-square h-8 w-8 items-center justify-end dt:hidden">
            <Image
              priority
              src={arrow}
              alt="icon"
              className="image-gray h-half w-half"
            />
          </div>
        </div>
      </Box>
    </Link>
  );
}
