"use client";
import { useAppSelector } from "@/store/useClient";
import { Input } from "@/components/global/Input";
import { useContext, useState } from "react";
import { SettingsContext } from "./Content";

export default function EditName() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const [testName, setTestName] = useState("Name:");

  return (
    <>
      <p className="w-32">{testName}</p>
      <Input
        spellCheck={false}
        focusNextInputOnEnter
        smartFocusNextInput
        maxCharacters={45}
        onKeyDown={(e) => {
          setTestName(e.key);
        }}
        onChange={(e) => context.handleNameInput(e.target.value)}
        styling={{
          main: "w-full border-inactive bg-first text-first placeholder-[var(--text-second)]",
        }}
        placeholder={exerciseData.name}
      />
    </>
  );
}
