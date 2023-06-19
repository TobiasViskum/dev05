"use client";

import { usePathname } from "next/navigation";
import Buttons from "./OldButtons";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import { isTheme } from "@/lib/util/themes";

interface Props {
  exerciseData: FitnessData;
  isClosed: boolean;
  profileData: ProfileData;
}

export default function FitnessCard({
  exerciseData,
  isClosed,
  profileData,
}: Props) {
  const path = usePathname();

  function getDefaultInputValue() {
    const splitPath = path.split("/");
    let defaultValue = "";

    if (splitPath[splitPath.length - 1] === "reps") {
      defaultValue += exerciseData.reps.toString().replace(".", ",");
      defaultValue += " kg";
      return defaultValue;
    } else if (splitPath[splitPath.length - 1] === "max") {
      defaultValue += exerciseData.max.toString().replace(".", ",");
      defaultValue += " kg";
      return defaultValue;
    }
  }

  return (
    <>
      <div className="min-w-small overflow-hidden border-none bg-transparent">
        <div
          className={twJoin(
            "mb-3 mr-3 flex flex-col gap-y-2 rounded-lg py-2 pl-3",
            isTheme("blue", profileData) ? "bg-second shadow-br-lg" : "bg-third"
          )}
        >
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg">
            {exerciseData.name}
          </h3>
          <div className="flex">
            <input
              className={twJoin(
                "w-32 rounded-md p-1 text-center text-second shadow-br-md outline-none",
                isTheme("blue", profileData)
                  ? "[background:_var(--bg-third)]"
                  : "bg-second"
              )}
              spellCheck={false}
              defaultValue={getDefaultInputValue()}
            />
            <div></div>
            <div></div>
          </div>
          <div className="my-1 grid grid-flow-col grid-cols-[repeat(3,_32px)] gap-x-4">
            <Buttons profileData={profileData} exerciseData={exerciseData} />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
