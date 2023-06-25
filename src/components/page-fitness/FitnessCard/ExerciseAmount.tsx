"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "@/store/useClient";
import { setExerciseData } from "@/store/fitnessStateSlice";

export default function ExerciseAmount({
  exerciseData,
}: {
  exerciseData: FitnessData;
}) {
  const dispatch = useAppDispatch();
  const [forceUpdate, setForceUpdate] = useState(false);
  const path = usePathname();
  const splitPath = path.split("/");
  const exerciseType = splitPath[splitPath.length - 1];
  let exerciseAmount =
    exerciseType === "reps" ? exerciseData.reps : exerciseData.max;
  let unitName = exerciseData.unit_name;
  let isLocked = exerciseData.is_date_locked;
  const UNIT_CONVERTER = 2.20462262;

  function roundToOneDecimal(number: number) {
    return number.toFixed(1).replace(/\.0+$/, "");
  }

  useEffect(() => {
    document.addEventListener(`updateExercise${exerciseData.id}`, ((
      e: CustomEvent<{
        newAmount: number;
        newUnit: string;
      }>
    ) => {
      setForceUpdate((prev) => !prev);
    }) as EventListener);

    document.addEventListener(`updateExerciseLock${exerciseData.id}`, ((
      e: CustomEvent<{
        newState: number;
      }>
    ) => {
      setForceUpdate((prev) => !prev);
    }) as EventListener);
  }, [exerciseData.id]);

  function getExerciseAmount(whatToGet: "primary" | "secondary") {
    if (whatToGet === "primary") {
      return exerciseAmount.toString().replace(".", ",");
    } else if (whatToGet === "secondary") {
      if (unitName.toLowerCase() === "kg") {
        const amount = exerciseAmount * UNIT_CONVERTER;
        return roundToOneDecimal(amount).replace(".", ",");
      } else if (unitName.toLowerCase() === "lbs") {
        const amount = exerciseAmount / UNIT_CONVERTER;
        return roundToOneDecimal(amount).replace(".", ",");
      }
    }
  }
  function getExerciseUnit(whatToGet: "primary" | "secondary") {
    if (whatToGet === "primary") {
      if (unitName.toLowerCase() === "kg") return "KG";
      return unitName;
    } else if (whatToGet === "secondary") {
      if (unitName.toLowerCase() === "kg") return "lbs";
      if (unitName === "lbs") return "KG";
    }
  }

  function handleEditClick() {
    if (isLocked === 0) {
      dispatch(setExerciseData(exerciseData));
      const event = new CustomEvent("showFitnessOverlay", {
        detail: { overlay: "editAmount" },
      });
      document.dispatchEvent(event);
    }
  }

  return (
    <div
      className="grid h-[72px] w-[72px] cursor-pointer grid-rows-[50%_50%] justify-center rounded-full border-4 border-solid border-inactive"
      onClick={handleEditClick}
    >
      <div className="flex flex-row items-end justify-center gap-x-1">
        <p className="pb-0.5 text-center text-sm leading-3 text-first">
          <b className="font-semibold">{getExerciseAmount("primary")}</b>{" "}
          {getExerciseUnit("primary")}
        </p>
      </div>
      <p className="pt-1 text-center text-3xs text-second">
        {getExerciseAmount("secondary")} {getExerciseUnit("secondary")}
      </p>
    </div>
  );
}
