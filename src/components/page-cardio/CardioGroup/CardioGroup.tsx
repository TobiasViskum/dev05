"use client";

import { useState } from "react";
import { hooks } from "@/lib/hooks/fitness-cardio";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  strExercisesInGroup: string;
  groupData: { name: string | "Ungrouped"; id: number | null };
}

export default function CardioGroup({ children, strExercisesInGroup, groupData }: Props) {
  const exercisesInGroup: CardioData[] = JSON.parse(strExercisesInGroup);
  const totalExercises = exercisesInGroup.length;

  const [isClosed, setIsClosed] = useState(false);

  function handleClick() {
    setIsClosed((prev) => !prev);
  }

  return (
    <div className="group relative mt-3 flex min-w-small flex-col items-center first:mt-0">
      <button
        className="grid w-full place-items-center rounded-full bg-second text-center text-lg"
        onClick={handleClick}
      >
        {groupData.name}
      </button>

      <div
        className="grid w-full"
        style={{
          gridTemplateRows: isClosed ? "0fr" : "1fr",
          transitionDuration: `${300 + 20 * totalExercises}ms`,
        }}
      >
        <div
          className={twMerge(
            `relative grid w-full grid-cols-1 gap-x-3 overflow-hidden transition-all vsm:grid-cols-2`,
            isClosed ? "mt-0 gap-y-0" : "mt-3 gap-y-3"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
