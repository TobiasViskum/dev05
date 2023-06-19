"use client";

import { useState, useEffect, useRef } from "react";
import { FitnessCard } from "@/components/page-fitness";
import { hooks } from "@/lib/hooks/page-fitness";
import { twJoin, twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { isTheme } from "@/lib/util/themes";

interface Props {
  strExercisesInGroup: string;
  groupData: { name: string | "Ungrouped"; id: number | null };
  profileData: ProfileData;
}

export default function FitnessGroup({
  strExercisesInGroup,
  groupData,
  profileData,
}: Props) {
  const router = useRouter();
  const exercisesInGroup: FitnessData[] = JSON.parse(strExercisesInGroup);
  const totalExercises = exercisesInGroup.length;

  const [gridRows, setGridRows] = useState(`repeat(${totalExercises}, 1fr)`);
  const [isClosed, setIsClosed] = useState(false);

  function changeGridRows(action: "small device" | "big device") {
    if (action === "small device") {
      const size = isClosed ? "0fr" : "1fr";
      setGridRows(`repeat(${totalExercises}, ${size})`);
    } else if (action === "big device") {
      const size = isClosed ? "0fr" : "1fr";
      setGridRows(`repeat(${Math.ceil(totalExercises / 2)}, ${size})`);
    }
  }

  hooks.useFitnessGroupGrid({ changeGridRows });

  function handleClick() {
    setIsClosed((prev) => !prev);
  }

  return (
    <div className="group relative mt-3 flex min-w-small flex-col items-center first:mt-0">
      <div
        className="grid w-full place-items-center rounded-full border border-solid border-inactive bg-first text-center text-lg"
        onClick={handleClick}
      >
        {groupData.name}
      </div>

      <div
        className={twMerge(
          `relative grid w-full grid-cols-1 gap-x-3 transition-all vsm:grid-cols-2`,
          isClosed ? "mt-0 gap-y-0" : "mt-3 gap-y-3"
        )}
        style={{
          gridTemplateRows: gridRows,
          transitionDuration: `${200 + 25 * totalExercises}ms`,
        }}
      >
        {exercisesInGroup.map((exercise, index) => {
          return (
            <FitnessCard
              key={index}
              exerciseData={exercise}
              isLast={index === exercisesInGroup.length - 1}
              profileData={profileData}
            />
          );
        })}
      </div>
    </div>
  );
}
