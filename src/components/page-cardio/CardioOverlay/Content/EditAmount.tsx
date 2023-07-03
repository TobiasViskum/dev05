import { useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/useClient";
import { CardioOverlayContext } from "../CardioOverlay";
import { roundToTwoDecimals } from "@/lib/util";
import { flushSync } from "react-dom";

export default function EditAmount() {
  const context = useContext(CardioOverlayContext);

  const exerciseData = useAppSelector(
    (state) => state.exerciseState.cardioExercise
  );
  const UNIT_CONVERTER = 0.62137119;
  const MAX_INPUT = 1000;
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

  function changeInputFocusHandler(
    timeToChange: "hours" | "minutes" | "seconds",
    value: number
  ) {
    let max = 60;
    if (timeToChange === "hours") max = 100;

    function action() {
      if (hoursRef.current && minutesRef.current && secondsRef.current) {
        if (timeToChange === "hours") {
          hoursRef.current.blur();
          minutesRef.current.focus();
          minutesRef.current.select();
        } else if (timeToChange === "minutes") {
          minutesRef.current.blur();
          secondsRef.current.focus();
          secondsRef.current.select();
        } else if (timeToChange === "seconds") {
          secondsRef.current.blur();
        }
      }
    }

    if (value === 0) {
      action();
    } else if (value > max / 10) {
      action();
    }
  }

  function handleTimeChange(
    e: React.ChangeEvent<HTMLInputElement>,
    timeToChange: "hours" | "minutes" | "seconds"
  ) {
    if (e.target.value.toString() === "") {
      if (timeToChange === "hours") {
        e.target.placeholder = [getTimeAmount().hours, "h"].join("");
      } else if (timeToChange === "minutes") {
        e.target.placeholder = [getTimeAmount().minutes, "m"].join("");
      } else if (timeToChange === "seconds") {
        e.target.placeholder = [getTimeAmount().seconds, "s"].join("");
      }
      setTimeValue((prev) => ({
        ...prev,
        [timeToChange]: "",
      }));
      return;
    }

    const value = Number(e.target.value.replace(",", "."));
    let min = 0;
    let max = 60;
    if (timeToChange === "hours") max = 100;

    const isNumber = !isNaN(value);
    if (isNumber === false) return;

    if (value < min || value > max) return;

    setTimeValue((prev) => ({
      ...prev,
      [timeToChange]: value.toString(),
    }));

    changeInputFocusHandler(timeToChange, value);
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

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") setInputValue("");
    const value = e.target.value.replace(",", ".");

    const isNumber = !isNaN(Number(value));

    if (
      isNumber &&
      ((currUnit.toLowerCase() === "km" && Number(value) <= MAX_INPUT) ||
        (currUnit.toLowerCase() === "mi" &&
          Number(value) <= MAX_INPUT * UNIT_CONVERTER))
    ) {
      const splitValue = value.split(".");
      if (splitValue.length === 1) {
        setInputValue(e.target.value.replace(".", ","));
      } else if (splitValue.length === 2) {
        if (splitValue[1].length <= 2) {
          setInputValue(e.target.value.replace(".", ","));
        }
      }
    }
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
        timeValue.hours === ""
          ? tempTimeValue.hours
          : Number(timeValue.hours.replace(/[a-zA-Z]/g, ""));
      tempTimeValue.minutes =
        timeValue.minutes === ""
          ? tempTimeValue.minutes
          : Number(timeValue.minutes.replace(/[a-zA-Z]/g, ""));
      tempTimeValue.seconds =
        timeValue.seconds === ""
          ? tempTimeValue.seconds
          : Number(timeValue.seconds.replace(/[a-zA-Z]/g, ""));
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

  function onTimeInputFocus(
    e: React.FocusEvent<HTMLInputElement>,
    timeToChange: "hours" | "minutes" | "seconds"
  ) {
    setTimeValue((prev) => ({
      ...prev,
      [timeToChange]: prev[timeToChange].replace(/[a-zA-Z]/g, ""),
    }));
    e.target.value = timeValue[timeToChange].replace(/[a-zA-Z]/g, "");
    e.target.placeholder = "";
    e.target.select();
  }
  function onTimeInputBlur(
    e: React.FocusEvent<HTMLInputElement>,
    timeToChange: "hours" | "minutes" | "seconds"
  ) {
    e.target.placeholder = [getTimeAmount().hours, timeToChange.charAt(0)].join(
      ""
    );
    if (e.target.value !== "") {
      setTimeValue((prev) => ({
        ...prev,
        [timeToChange]: [prev[timeToChange], timeToChange.charAt(0)].join(""),
      }));
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-y-2">
        <div className="mt-2">
          <h3 className="text-center font-medium">EDIT EXERCISE</h3>
          <p className="text-center text-second">
            {exerciseData && exerciseData.name}
          </p>
        </div>
        <div className="mb-2 flex items-center justify-center gap-x-2">
          <input
            value={inputValue}
            onChange={(e) => handleInput(e)}
            ref={inputRef}
            className="w-3/5 rounded-md border border-solid border-inactive bg-first py-1 text-center text-first placeholder-[var(--text-second)] outline-none"
            placeholder={placeholderValue.replace(".", ",")}
            inputMode="decimal"
            pattern="[0-9],*"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = placeholderValue.replace(".", ","))
            }
          />
          <button
            className="w-8 rounded-md border border-solid border-inactive bg-first py-1 text-base"
            onClick={handleUnitChange}
          >
            {currUnit}
          </button>
        </div>
        <div className="mb-2 flex items-center justify-center gap-x-1">
          <input
            value={timeValue.hours}
            onChange={(e) => handleTimeChange(e, "hours")}
            ref={hoursRef}
            className="w-14 rounded-md border border-solid border-inactive bg-first py-1 text-center text-first placeholder-[var(--text-second)] outline-none"
            placeholder={[getTimeAmount().hours, "h"].join("")}
            inputMode="decimal"
            pattern="[0-9],*"
            onFocus={(e) => {
              onTimeInputFocus(e, "hours");
            }}
            onBlur={(e) => onTimeInputBlur(e, "hours")}
          />
          {":"}
          <input
            value={timeValue.minutes}
            onChange={(e) => handleTimeChange(e, "minutes")}
            ref={minutesRef}
            className="w-14 rounded-md border border-solid border-inactive bg-first py-1 text-center text-first placeholder-[var(--text-second)] outline-none"
            placeholder={[getTimeAmount().minutes, "m"].join("")}
            inputMode="decimal"
            pattern="[0-9],*"
            onFocus={(e) => onTimeInputFocus(e, "minutes")}
            onBlur={(e) => onTimeInputBlur(e, "minutes")}
          />
          {":"}
          <input
            value={timeValue.seconds}
            onChange={(e) => handleTimeChange(e, "seconds")}
            ref={secondsRef}
            className="w-14 rounded-md border border-solid border-inactive bg-first py-1 text-center text-first placeholder-[var(--text-second)] outline-none"
            placeholder={[getTimeAmount().seconds, "s"].join("")}
            inputMode="decimal"
            pattern="[0-9],*"
            onFocus={(e) => onTimeInputFocus(e, "seconds")}
            onBlur={(e) => onTimeInputBlur(e, "seconds")}
          />
        </div>
        <button
          className="mb-4 w-2/5 rounded-lg bg-news shadow-circle-lg shadow-white"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </>
  );
}
