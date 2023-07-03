"use client";
import Input from "@/components/global/Input";
import { useAppSelector } from "@/store/useClient";
import { twJoin } from "tailwind-merge";

export default function EditName() {
  const exerciseData = useAppSelector(
    (state) => state.exerciseState.cardioExercise
  );

  return (
    <>
      <p className="ml-4 w-32">Name:</p>
      <input
        className={twJoin(
          "w-full rounded-md border border-solid border-inactive bg-first py-1.5",
          "text-center text-sm text-first placeholder-[var(--text-second)] outline-none"
        )}
        placeholder={exerciseData.name}
      />
    </>
  );
}
