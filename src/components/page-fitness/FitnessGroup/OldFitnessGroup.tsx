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

export default function OldFitnessGroup({
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
    <div className="group relative flex min-w-small flex-col items-center">
      <div
        className={twMerge(
          "relative flex h-8 w-[calc(100%_+_32px)] min-w-small items-center rounded-tr-full border border-b-0 border-l-0 border-solid border-inactive pl-4 text-center",
          isTheme("blue", profileData)
            ? "border-none [background:_var(--bg-third)]"
            : "bg-first"
        )}
        onClick={handleClick}
      >
        <h2 className="">{groupData.name}</h2>
        <div
          className={twMerge(
            "absolute bottom-0 left-0 h-1 w-[calc(100%_-_14px)] border-b border-solid border-inactive transition-all duration-0 ",
            isClosed ? "w-full" : "",
            isTheme("blue", profileData) ? "border-none" : ""
          )}
          style={{
            transitionDelay: isClosed
              ? `${200 + 10 * totalExercises}ms`
              : "0ms",
          }}
        />
      </div>
      <div
        className={twMerge(
          "absolute -right-4 top-8 h-[calc(100%)] w-4 rounded-b-full border-x border-b border-inactive transition-all",
          isClosed ? "h-0 border-0 ease-linear" : "",
          isTheme("blue", profileData)
            ? "border-none bg-[var(--bg-fitness-group)]"
            : "bg-first"
        )}
        style={{ transitionDuration: `${200 + 10 * totalExercises}ms` }}
      >
        <div
          className={twMerge(
            "absolute bottom-[1px] right-0 z-10 w-[14px] bg-first transition-[height] group-last:invisible",
            isClosed ? "h-0" : "h-8 delay-100",
            isTheme("blue", profileData) ? "hidden" : ""
          )}
        />
      </div>

      <div
        className={twMerge(
          `relative -ml-1 mt-3 grid w-full grid-cols-1 gap-x-3 transition-grid vsm:grid-cols-2`
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
