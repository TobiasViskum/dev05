"use client";
import { useAppSelector } from "@/store/useClient";
import { Input } from "@/components/global/Input";
import { useContext } from "react";
import { SettingsContext } from "./Content";

export default function EditName() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);

  return (
    <>
      <p className="w-32">Name:</p>
      <Input
        spellCheck={false}
        focusNextElementOnEnter
        maxCharacters={45}
        onChange={(e) => context.handleNameInput(e.target.value)}
        styling={{
          main: "w-full border-inactive bg-first text-first placeholder-[var(--text-second)]",
        }}
        placeholder={exerciseData.name}
      />
    </>
  );
}
