"use client";
import { useAppSelector } from "@/store/useClient";
import { twJoin } from "tailwind-merge";
import { Input } from "@/components/global/Input";

export default function EditName() {
  const exerciseData = useAppSelector(
    (state) => state.exerciseState.cardioExercise
  );

  return (
    <>
      <p className="ml-4 w-32">Name:</p>
      <Input
        onlyNumbers
        useComma
        maxDecimals={3}
        className="w-full border-inactive bg-first text-first placeholder-[var(--text-second)]"
        placeholder={exerciseData.name}
      />
    </>
  );
}
