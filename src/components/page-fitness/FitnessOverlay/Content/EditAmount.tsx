import { useRef } from "react";

interface Props {
  exerciseData: FitnessData | null;
}

export default function EditAmount({ exerciseData }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="flex flex-col items-center gap-y-2 pb-5 pt-3">
        <div>
          <h3 className="text-center font-medium">EDIT AMOUNT</h3>
          <p className="text-center text-second">
            {exerciseData && exerciseData.name}
          </p>
        </div>
        <input
          ref={inputRef}
          className="mb-2 mt-1 w-3/5 rounded-lg border-2 border-solid border-inactive bg-first py-1 text-center text-first placeholder-[var(--text-second)] outline-none"
          placeholder={"65"}
          inputMode="decimal"
          pattern="[0-9],*"
        />
        <button className="w-2/5 rounded-lg bg-news shadow-circle-lg shadow-white">
          Save
        </button>
      </div>
    </>
  );
}
