import { useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/useClient";
import { CardioOverlayContext } from "../CardioOverlay";
import { roundToTwoDecimals } from "@/lib/util";
import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";

export default function EditAmount() {
  const context = useContext(CardioOverlayContext);

  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const UNIT_CONVERTER = 0.62137119;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState(
    exerciseData.unit_name.toLowerCase() === "mi"
      ? roundToTwoDecimals(exerciseData.distance * UNIT_CONVERTER).toString()
      : roundToTwoDecimals(exerciseData.distance).toString()
  );
  const [currUnit, setCurrUnit] = useState(exerciseData.unit_name);
  const [timeValue, setTimeValue] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  const hoursRef = useRef<HTMLInputElement | null>(null);
  const minutesRef = useRef<HTMLInputElement | null>(null);
  const secondsRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPlaceholderValue(
      exerciseData.unit_name.toLowerCase() === "mi"
        ? roundToTwoDecimals(exerciseData.distance * UNIT_CONVERTER).toString()
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
    const seconds = timeAmount.seconds ? timeAmount.seconds : 0;
    return {
      hours: hours.toString().replace(".", ","),
      minutes: minutes.toString().replace(".", ","),
      seconds: seconds.toString().replace(".", ","),
    };
  }

  function changeUnitTo(prevValue: string, unit: "km" | "mi") {
    let tempValue = Number(prevValue.replace(",", "."));
    if (unit === "km") {
      tempValue = tempValue / UNIT_CONVERTER;
    } else {
      tempValue = tempValue * UNIT_CONVERTER;
    }
    const newValue = roundToTwoDecimals(tempValue);
    return newValue;
  }

  function handleUnitChange() {
    if (currUnit === "km") {
      setCurrUnit("mi");
      setPlaceholderValue((prev) => changeUnitTo(prev, "mi"));
      if (inputValue !== "") {
        setInputValue((prev) => changeUnitTo(prev, "mi"));
      }
      return;
    }
    if (currUnit === "mi") {
      setCurrUnit("km");
      setPlaceholderValue((prev) => changeUnitTo(prev, "km"));
      if (inputValue !== "") {
        setInputValue((prev) => changeUnitTo(prev, "km"));
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
          : Number(timeValue.seconds);
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
      inputValue === ""
        ? exerciseData.distance
        : Number(inputValue.replace(",", "."));
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
            styling={{
              main: "w-36 border-inactive bg-first text-center text-first placeholder-[var(--text-second)]",
            }}
            placeholder={placeholderValue}
            smartFocusNextInput
            useComma
            onlyNumbers
            maxDecimals={2}
            minValue={0}
            maxValue={999}
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
          />
          {":"}
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
            value={timeValue.seconds}
            onlyNumbers
            minValue={0}
            disableFeedback
            smartFocusNextInput
            dynamicSuffix="s"
            maxValue={60}
            useComma
            maxDecimals={2}
            maxCharacters={5}
            onChange={(e) =>
              setTimeValue((prev) => ({ ...prev, seconds: e.target.value }))
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
