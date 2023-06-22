"use client";

import { useState } from "react";
import { hooks } from "@/lib/hooks/page-fitness";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  strExercisesInGroup: string;
  groupData: { name: string | "Ungrouped"; id: number | null };
}

export default function FitnessGroup({
  children,
  strExercisesInGroup,
  groupData,
}: Props) {
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
      <button
        className="grid w-full place-items-center rounded-full border border-solid border-inactive bg-first text-center text-lg"
        onClick={handleClick}
      >
        {groupData.name}
      </button>

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
        {children}
      </div>
    </div>
  );
}
