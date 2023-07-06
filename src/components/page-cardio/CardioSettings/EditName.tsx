"use client";
import { useAppSelector } from "@/store/useClient";
import { Input } from "@/components/global/Input";
import { useContext, useRef } from "react";
import { SettingsContext } from "./Content";

export default function EditName() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <p className="w-20">Name:</p>
      <Input
        spellCheck={false}
        focusNextInputOnEnter
        smartFocusNextInput
        maxCharacters={45}
        ref={inputRef}
        onChange={(e) => context.handleNameInput(e.target.value)}
        styling={{
          main: "w-full border-inactive bg-first text-first placeholder-[var(--text-second)]",
        }}
        placeholder={exerciseData.name}
      />
    </>
  );
}
