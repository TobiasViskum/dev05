"use client";

import dayjs from "dayjs";
import { CardContext } from "./CardProvider";
import { useContext } from "react";

export default function InfoBox() {
  const context = useContext(CardContext);
  const exerciseData = context.exerciseData;

  const tw = "text-2xs";

  function getTime() {
    const time_amount = exerciseData.time_amount;

    if (time_amount === null) return <p className={tw}>0h 0m 0s</p>;
    const hours = time_amount.hours ? [time_amount.hours, "h"].join("") : "";
    const minutes = time_amount.minutes
      ? [time_amount.minutes, "m"].join("")
      : "";
    const seconds = time_amount.seconds
      ? [time_amount.seconds, "s"].join("")
      : "";

    return <p className={tw}>{[hours, minutes, seconds].join(" ")}</p>;
  }

  function getDate() {
    if (exerciseData.updated_date !== null) {
      const date = new Date(exerciseData.updated_date);
      const formattedDate = dayjs(date).format("MM-DD-YYYY");
      return <p className={tw}>{formattedDate}</p>;
    } else return <p className={tw}>-</p>;
  }

  return (
    <div className="flex w-[72px] flex-col">
      <p className="text-2xs text-second underline">Info</p>
      {getTime()}
      {getDate()}
    </div>
  );
}
