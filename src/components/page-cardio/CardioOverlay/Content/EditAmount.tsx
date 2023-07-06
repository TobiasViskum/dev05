"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/useClient";
import { CardioOverlayContext } from "../CardioOverlay";
import { roundToTwoDecimals } from "@/lib/util";
import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";
import { roundToDecimals } from "@/lib/util/functions";

export default function EditAmount() {
  const context = useContext(CardioOverlayContext);

  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const TO_MILES = 0.62137119223733396961743418436332;
  const TO_METERS = 1000;
  const availableUnits: ("km" | "mi" | "m")[] = ["km", "mi", "m"];
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState(
    exerciseData.unit_name === "mi"
      ? roundToTwoDecimals(exerciseData.distance * TO_MILES).toString()
      : exerciseData.unit_name === "m"
      ? roundToTwoDecimals(exerciseData.distance * TO_METERS).toString()
      : roundToTwoDecimals(exerciseData.distance).toString()
  );
  const [currUnit, setCurrUnit] = useState(exerciseData.unit_name);
  const [timeValue, setTimeValue] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const distanceInKilometers = useRef(0);

  const hoursRef = useRef<HTMLInputElement | null>(null);
  const minutesRef = useRef<HTMLInputElement | null>(null);
  const secondsRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPlaceholderValue(
      exerciseData.unit_name === "mi"
        ? roundToTwoDecimals(exerciseData.distance * TO_MILES).toString()
        : exerciseData.unit_name === "m"
        ? roundToTwoDecimals(exerciseData.distance * TO_METERS).toString()
        : roundToTwoDecimals(exerciseData.distance).toString()
    );
    setCurrUnit(exerciseData.unit_name);
    setInputValue("");
    setTimeValue({ hours: "", minutes: "", seconds: "" });
  }, [context.uniqueOpenUid, exerciseData]);

  function getTimeAmount() {
    const timeAmount = exerciseData.time_amount;
    if (!timeAmount) return { hours: "0", minutes: "0", seconds: "0" };
    const hours = timeAmount.hours ? timeAmount.hours : 0;
    const minutes = timeAmount.minutes ? timeAmount.minutes : 0;
    const seconds = timeAmount.seconds
      ? currUnit === "m"
        ? timeAmount.seconds
        : Math.round(timeAmount.seconds)
      : 0;
    return {
      hours: hours.toString().replace(".", ","),
      minutes: minutes.toString().replace(".", ","),
      seconds: seconds.toString().replace(".", ","),
    };
  }

  function changeUnitTo(
    type: "value" | "placeholder",
    unit: "km" | "mi" | "m"
  ) {
    let value = 0;
    if (type === "placeholder") {
      if (unit === "km") {
        value = exerciseData.distance;
      } else if (unit === "mi") {
        value = exerciseData.distance * TO_MILES;
      } else if (unit === "m") {
        value = exerciseData.distance * TO_METERS;
      }
    } else if (type === "value") {
      if (unit === "km") {
        value = distanceInKilometers.current;
      } else if (unit === "mi") {
        value = distanceInKilometers.current * TO_MILES;
      } else if (unit === "m") {
        value = distanceInKilometers.current * TO_METERS;
      }
    }
    return roundToTwoDecimals(value);
  }

  function handleUnitChange() {
    if (currUnit === "m" || currUnit === "km" || currUnit === "mi") {
      const i = availableUnits.indexOf(currUnit);
      const nextUnit =
        availableUnits[i + 1] === undefined
          ? availableUnits[0]
          : availableUnits[i + 1];
      setCurrUnit(nextUnit);
      setPlaceholderValue(changeUnitTo("placeholder", nextUnit));
      if (inputValue !== "") {
        setInputValue(changeUnitTo("value", nextUnit));
      }
    }
  }

  async function updateAmountAndUnit(
    newDistance: number,
    newUnit: string,
    hours: number,
    minutes: number,
    seconds: number
  ) {
    await fetch("/api/cardio/update-distance-unit-time", {
      method: "POST",
      body: JSON.stringify({
        id: exerciseData.id,
        newDistance: newDistance,
        newUnit: newUnit,
        newTime: {
          hours: hours, //number
          minutes: minutes, //number
          seconds: seconds, //number
        },
      }),
    });
  }

  async function handleSaveClick() {
    function getNewTimeValue() {
      const timeAmount = exerciseData.time_amount;
      let tempTimeValue = !timeAmount
        ? { hours: 0, minutes: 0, seconds: 0 }
        : {
            hours: timeAmount.hours || 0,
            minutes: timeAmount.minutes || 0,
            seconds: timeAmount.seconds || 0,
          };
      tempTimeValue.hours =
        timeValue.hours === "" ? tempTimeValue.hours : Number(timeValue.hours);
      tempTimeValue.minutes =
        timeValue.minutes === ""
          ? tempTimeValue.minutes
          : Number(timeValue.minutes);
      tempTimeValue.seconds =
        timeValue.seconds === ""
          ? tempTimeValue.seconds
          : Number(timeValue.seconds.replace(",", "."));

      if (currUnit === "m") {
        tempTimeValue.hours = 0;
      }
      return tempTimeValue;
    }

    function isAmountUnchanged() {
      const amount = exerciseData.distance;
      if (inputValue === "") return true;

      return amount === Number(inputValue.replace(",", "."));
    }

    const isUnitUnchanged =
      exerciseData.unit_name.toLowerCase() === currUnit.toLowerCase();

    function isTimeUnchanged() {
      if (
        timeValue.hours === "" &&
        timeValue.minutes === "" &&
        timeValue.seconds === ""
      )
        return true;

      return false;
    }

    if (isAmountUnchanged() && isUnitUnchanged && isTimeUnchanged()) {
      context.closeOverlay();
      return;
    }

    context.changeActiveOverlay("loading");

    const newDistance =
      inputValue === "" ? exerciseData.distance : distanceInKilometers.current;
    const newTimeValue = getNewTimeValue();

    const event = new CustomEvent(`updateExercise${exerciseData?.id}`, {
      detail: {
        newDistance: newDistance,
        newUnit: currUnit,
        newTimeValue: newTimeValue,
      },
    });

    document.dispatchEvent(event);

    await updateAmountAndUnit(
      newDistance,
      currUnit,
      newTimeValue.hours,
      newTimeValue.minutes,
      newTimeValue.seconds
    );
    setTimeout(() => {
      router.refresh();
      context.changeActiveOverlay("animation");
    }, 200);
  }

  function handleChange(value: string) {
    setInputValue(value);
    const newValue = value.replace(",", ".");
    if (currUnit === "km") {
      distanceInKilometers.current = Number(newValue);
    } else if (currUnit === "mi") {
      distanceInKilometers.current = Number(newValue) / TO_MILES;
    } else if (currUnit === "m") {
      distanceInKilometers.current = Number(newValue) / TO_METERS;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-y-2 px-6">
        <div className="mt-2">
          <h3 className="text-center font-medium">EDIT EXERCISE</h3>
          <p className="text-center text-second">
            {exerciseData && exerciseData.name}
          </p>
        </div>
        <div className="mb-2 flex w-48 items-center justify-center gap-x-2">
          <Input
            value={
              currUnit !== "m"
                ? inputValue
                : inputValue === ""
                ? inputValue
                : Math.round(Number(inputValue.replace(",", "."))).toString()
            }
            onChange={(e) => handleChange(e.target.value)}
            ref={inputRef}
            styling={{
              main: "w-36 border-inactive bg-first text-center text-first placeholder-[var(--text-second)]",
            }}
            placeholder={
              currUnit !== "m"
                ? placeholderValue
                : placeholderValue === ""
                ? placeholderValue
                : Math.round(
                    Number(placeholderValue.replace(",", "."))
                  ).toString()
            }
            smartBlur
            useComma
            onlyNumbers={currUnit === "m" ? false : true}
            onlyIntegers={currUnit === "m" ? true : false}
            maxDecimals={currUnit === "m" ? 0 : 2}
            minValue={0}
            maxValue={
              currUnit === "m"
                ? 1000 * TO_METERS
                : currUnit === "mi"
                ? Number(roundToDecimals(1000 * TO_MILES, 2).replace(",", "."))
                : 1000
            }
          />
          <Button
            insideModal
            styling={{ main: "h-8 w-8 bg-first py-1 text-base" }}
            onClick={handleUnitChange}
          >
            {currUnit}
          </Button>
        </div>
        <div className="mb-2 flex w-48 items-center justify-center gap-x-1">
          {currUnit !== "m" ? (
            <>
              <Input
                value={timeValue.hours}
                onlyIntegers
                minValue={0}
                disableFeedback
                smartFocusNextInput
                dynamicSuffix="h"
                maxValue={99}
                maxCharacters={2}
                onChange={(e) =>
                  setTimeValue((prev) => ({ ...prev, hours: e.target.value }))
                }
                ref={hoursRef}
                styling={{
                  main: "w-16 border-inactive bg-first text-first placeholder-[var(--text-second)]",
                }}
                placeholder={getTimeAmount().hours}
              />{" "}
              {":"}
            </>
          ) : (
            ""
          )}
          <Input
            value={timeValue.minutes}
            onlyIntegers
            minValue={0}
            disableFeedback
            smartFocusNextInput
            dynamicSuffix="m"
            maxValue={60}
            maxCharacters={2}
            onChange={(e) =>
              setTimeValue((prev) => ({ ...prev, minutes: e.target.value }))
            }
            ref={minutesRef}
            styling={{
              main: "w-16 border-inactive bg-first text-first placeholder-[var(--text-second)]",
            }}
            placeholder={getTimeAmount().minutes}
          />
          {":"}
          <Input
            value={
              currUnit === "m"
                ? timeValue.seconds
                : timeValue.seconds === ""
                ? timeValue.seconds
                : Math.round(
                    Number(timeValue.seconds.replace(",", "."))
                  ).toString()
            }
            onlyNumbers={currUnit === "m" ? true : false}
            onlyIntegers={currUnit === "m" ? false : true}
            minValue={0}
            disableFeedback
            smartFocusNextInput
            dynamicSuffix="s"
            maxValue={60}
            useComma
            maxDecimals={currUnit === "m" ? 2 : 0}
            onChange={(e) =>
              setTimeValue((prev) => ({
                ...prev,
                seconds: e.target.value,
              }))
            }
            ref={secondsRef}
            styling={{
              main: "w-16 border-inactive bg-first text-first placeholder-[var(--text-second)]",
            }}
            placeholder={getTimeAmount().seconds}
          />
        </div>
        <Button
          insideModal
          styling={{
            main: "mb-4 w-2/5 rounded-lg bg-news shadow-circle-lg border-none",
          }}
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </div>
    </>
  );
}
