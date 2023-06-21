import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  exerciseData: FitnessData | null;
  closeOverlay: () => void;
}

export default function EditAmount({ exerciseData, closeOverlay }: Props) {
  const UNIT_CONVERTER = 2.20462262;
  const MAX_INPUT = 1000;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const path = usePathname();
  const exerciseType = path.split("/").slice(-1)[0];
  const [inputValue, setInputValue] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState(
    exerciseData
      ? exerciseType === "reps"
        ? exerciseData.reps.toString()
        : exerciseType === "max"
        ? exerciseData.max.toString()
        : "0"
      : "0"
  );
  const [currUnit, setCurrUnit] = useState(
    exerciseData === null
      ? "KG"
      : exerciseData.unit_name === "kg"
      ? "KG"
      : "lbs"
  );

  function changeUnitTo(prevValue: string | undefined, unit: "KG" | "lbs") {
    let tempValue = Number(prevValue?.replace(",", "."));
    if (unit === "KG") {
      tempValue = tempValue / UNIT_CONVERTER;
    } else {
      tempValue = tempValue * UNIT_CONVERTER;
    }
    const newValue = tempValue
      .toFixed(1)
      .replace(/\.0+$/, "")
      .toString()
      .replace(".", ",");
    return newValue;
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") setInputValue("");
    const value = e.target.value.replace(",", ".");

    const isNumber = !isNaN(Number(value));

    if (
      isNumber &&
      ((currUnit.toLowerCase() === "kg" && Number(value) <= MAX_INPUT) ||
        (currUnit.toLowerCase() === "lbs" &&
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
    if (currUnit === "KG") {
      setCurrUnit("lbs");
      setPlaceholderValue((prev) => changeUnitTo(prev, "lbs"));
      if (inputValue !== "") {
        setInputValue((prev) => changeUnitTo(prev, "lbs"));
      }
      return;
    }
    if (currUnit === "lbs") {
      setCurrUnit("KG");
      setPlaceholderValue((prev) => changeUnitTo(prev, "KG"));
      if (inputValue !== "") {
        setInputValue((prev) => changeUnitTo(prev, "KG"));
      }
    }
  }

  async function updateAmountAndUnit(newAmount: number, newUnit: string) {}

  function handleSaveClick() {
    let newAmount = "";
    if (inputValue === "") {
      newAmount = placeholderValue;
    } else newAmount = inputValue;

    const event = new CustomEvent(`updateExercise${exerciseData?.id}`, {
      detail: {
        newAmount: Number(newAmount.replace(",", ".")).toString(),
        newUnit: currUnit,
      },
    });
    document.dispatchEvent(event);
    closeOverlay();
  }

  return (
    <>
      <div className="flex flex-col items-center gap-y-2 pb-5 pt-3">
        <div>
          <h3 className="text-center font-medium">EDIT AMOUNT</h3>
          <p className="text-center text-second">
            {exerciseData && exerciseData.name}
          </p>
        </div>
        <div className="flex gap-x-2 items-center justify-center mb-2 mt-1">
          <input
            value={inputValue}
            onChange={(e) => handleInput(e)}
            ref={inputRef}
            className="w-3/5 rounded-lg border-2 border-solid border-inactive bg-first py-1 text-center text-first placeholder-[var(--text-second)] outline-none"
            placeholder={placeholderValue}
            inputMode="decimal"
            pattern="[0-9],*"
          />
          <button
            className="bg-first border-2 border-solid w-8 border-inactive py-1 rounded-lg text-base"
            onClick={handleUnitChange}
          >
            {currUnit}
          </button>
        </div>
        <button
          className="w-2/5 rounded-lg bg-news shadow-circle-lg shadow-white"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </>
  );
}
