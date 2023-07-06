"use client";

import dayjs from "dayjs";
import { CardContext } from "./CardProvider";
import { useContext } from "react";

export default function InfoBox() {
  const context = useContext(CardContext);
  const exerciseData = context.exerciseData;

  const tw = "text-2xs";

  function getTime() {
    const timeAmount = exerciseData.time_amount;

    let formattedTime = "";
    if (exerciseData.unit_name === "m" && timeAmount) {
      const minutes = timeAmount.minutes
        ? [timeAmount.minutes, ":"].join("")
        : "0:";
      const seconds = timeAmount.seconds
        ? timeAmount.seconds.toString().replace(".", ",")
        : "";
      formattedTime = [minutes, seconds].join("");
    } else if (timeAmount) {
      const hours = timeAmount.hours ? [timeAmount.hours, ":"].join("") : "0:";
      const minutes = timeAmount.minutes
        ? [timeAmount.minutes, ":"].join("")
        : "00:";
      const seconds = timeAmount.seconds ? Math.round(timeAmount.seconds) : "";
      formattedTime = [hours, minutes, seconds].join("");
    } else {
      formattedTime = "0:00:00";
    }

    return <p className={tw}>{formattedTime}</p>;
  }

  function getDate() {
    if (exerciseData.updated_date !== null) {
      const date = new Date(exerciseData.updated_date);
      const formattedDate = dayjs(date).format("MM-DD-YYYY");
      return <p className={tw}>{formattedDate}</p>;
    } else return <p className={tw}>{"-"}</p>;
  }

  return (
    <div className="flex w-[72px] flex-col">
      <p className="text-2xs text-second underline">Info</p>
      {getTime()}
      {getDate()}
    </div>
  );
}
