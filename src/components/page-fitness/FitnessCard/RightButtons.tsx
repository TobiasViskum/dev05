"use client";

import Image from "next/image";
import {
  graph,
  veryHappySmiley,
  littleHappySmiley,
  neutralUpSmiley,
  neutralDownSmiley,
  littleSadSmiley,
  verySadSmiley,
} from "@/assets/images";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { useAppSelector } from "@/store/useClient";

export default function RightButton({
  exerciseData,
}: {
  exerciseData: FitnessData;
}) {
  const profileData = useAppSelector((state) => state.userData.profileData);

  const path = usePathname();
  const splitPath = path.split("/");
  const exerciseType = splitPath[splitPath.length - 1];

  function getVasImage() {
    if (exerciseType === ("reps" || "max")) {
      const vas = exerciseData[`vas_${exerciseType}`];

      if (vas === 0) return veryHappySmiley;
      if (vas >= 1 && vas <= 3) return littleHappySmiley;
      if (vas === 4) return neutralUpSmiley;
      if (vas >= 5 && vas <= 6) return neutralDownSmiley;
      if (vas >= 7 && vas <= 9) return littleSadSmiley;
      if (vas === 10) return verySadSmiley;
    }
    return neutralUpSmiley;
  }
  function getVasImageColor() {
    if (exerciseType === "reps" || exerciseType === "max") {
      const vas = exerciseData[`vas_${exerciseType}`];

      if (vas === 0) return "vas_0";
      if (vas >= 1 && vas <= 3) return "vas_1-3";
      if (vas === 4) return "vas_4";
      if (vas >= 5 && vas <= 6) return "vas_5-6";
      if (vas >= 7 && vas <= 9) return "vas_7-9";
      if (vas === 10) return "vas_10";
    }
    return "vas_4";
  }
  function getVasTextColor() {
    if (exerciseType === "reps" || exerciseType === "max") {
      const vas = exerciseData[`vas_${exerciseType}`];

      if (vas === 0) return "text-green-600";
      if (vas >= 1 && vas <= 3) return "text-lime-500";
      if (vas === 4) return "text-yellow-300";
      if (vas >= 5 && vas <= 6) return "text-yellow-400";
      if (vas >= 7 && vas <= 9) return "text-orange-600";
      if (vas === 10) return "text-red-600";
    }
    return "text-yellow-400";
  }

  return (
    <>
      <button className="flex h-9 w-9 flex-col items-center justify-center rounded-lg border-2 border-solid border-[var(--bg-third)]">
        <div className="h-4 w-4">
          <Image priority src={graph} alt="sm" className="image-gray" />
        </div>
        <p className="text-center text-6xs text-second">Stats</p>
      </button>

      {profileData.show_vas_fitness === 1 && (
        <button className="flex h-9 w-9 flex-col items-center justify-center rounded-lg border-2 border-solid border-[var(--bg-third)]">
          <div className="h-4 w-4">
            <Image
              priority
              src={getVasImage()}
              alt="sm"
              className={getVasImageColor()}
            />
          </div>
          <p className={twJoin("text-center text-6xs", getVasTextColor())}>
            VAS
          </p>
        </button>
      )}
    </>
  );
}
