"use client";

import { useContext } from "react";
import { SettingsContext } from "./Content";
import { useAppSelector } from "@/store/useClient";
import { DropDown } from "@/components/global/DropDown";

export default function EditUnit() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const cardioGroupings = useAppSelector((state) => state.appState.cardioUnits);

  let content = [];

  for (let i = 0; i < cardioGroupings.length; i++) {
    const item = cardioGroupings[i];

    if (
      item.unit_id !== exerciseData.unit_id &&
      item.unit_name !== exerciseData.unit_name
    ) {
      content.push({ title: item.unit_name, id: item.unit_id });
    }
  }

  function onGroupChange(e: {
    title: string;
    description?: string;
    id?: number;
  }) {
    context.handleGroupInput(e.title);
  }

  return (
    <>
      <p className="w-32">Unit:</p>
      <DropDown
        disableCreate
        spellCheck={false}
        focusNextElementOnEnter
        onUpdate={(e) => onGroupChange(e)}
        styling={{
          main: "z-10 w-full border-inactive bg-first text-first placeholder-[var(--text-second)]",
        }}
        placeholder={exerciseData.unit_name}
        dropDownItems={content}
      />
    </>
  );
}
