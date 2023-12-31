"use client";

import { useEffect, useState, useContext } from "react";
import { useAppDispatch } from "@/store/useClient";
import { setCardioExercise } from "@/store/appStateSlice";
import { CardContext } from "./CardProvider";
import { twJoin } from "tailwind-merge";
import { roundToDecimals } from "@/lib/util/functions";

export default function ExerciseAmount() {
  const context = useContext(CardContext);
  const exerciseData = context.exerciseData;
  const TO_MILES = 0.62137119;
  const TO_METERS = 1000;
  const distance =
    exerciseData.unit_name === "mi"
      ? exerciseData.distance * TO_MILES
      : exerciseData.unit_name === "m"
      ? exerciseData.distance * TO_METERS
      : exerciseData.distance;

  const dispatch = useAppDispatch();
  const [forceUpdate, setForceUpdate] = useState(false);

  let isLocked = exerciseData.is_date_locked;

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

  function getAverageSpeed() {
    const time_amount = exerciseData.time_amount;
    let distanceNonMeter = distance;
    if (!time_amount) return 0;
    if (distanceNonMeter === 0) return 0;

    const hours = time_amount.hours ? time_amount.hours : 0;
    const minutes = time_amount.minutes ? time_amount.minutes : 0;
    const seconds = time_amount.seconds ? time_amount.seconds : 0;

    if (exerciseData.unit_name === "m")
      distanceNonMeter = distanceNonMeter / TO_METERS;

    return distanceNonMeter / (hours + minutes / 60 + seconds / 3600);
  }

  function getDistance() {
    if (exerciseData.unit_name === "m") {
      return [Math.round(distance), exerciseData.unit_name].join(" ");
    } else {
      return [roundToDecimals(distance, 2), exerciseData.unit_name].join(" ");
    }
  }

  function getPrimaryTitle() {
    if (exerciseData.is_sprint === 1) {
      return [
        roundToDecimals(getAverageSpeed(), 1),
        `${exerciseData.unit_name === "m" ? "km" : exerciseData.unit_name}/h`,
      ].join(" ");
    } else {
      return getDistance();
    }
  }
  function getSecondaryTitle() {
    if (exerciseData.is_sprint === 1) {
      return getDistance();
    } else {
      return [
        roundToDecimals(getAverageSpeed(), 1),
        `${exerciseData.unit_name === "m" ? "km" : exerciseData.unit_name}/h`,
      ].join(" ");
    }
  }

  function handleEditClick() {
    if (isLocked === 0) {
      dispatch(setCardioExercise(exerciseData));
      const event = new CustomEvent("showCardioOverlay", {
        detail: { overlay: "editAmount" },
      });
      document.dispatchEvent(event);
    }
  }

  return (
    <div
      className={twJoin(
        "grid h-20 w-20 grid-rows-[50%_50%] justify-center rounded-full border-4 border-solid border-inactive",
        exerciseData.is_date_locked ? "cursor-auto" : "cursor-pointer"
      )}
      onClick={handleEditClick}
    >
      <div className="flex flex-row items-end justify-center gap-x-1">
        <p className="pb-0.5 text-center text-sm leading-3 text-first">
          {getPrimaryTitle()}
        </p>
      </div>
      <p className="pt-1 text-center text-3xs text-second">
        {getSecondaryTitle()}
      </p>
    </div>
  );
}
