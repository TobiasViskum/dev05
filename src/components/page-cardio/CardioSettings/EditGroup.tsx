"use client";

import { useContext } from "react";
import { SettingsContext } from "./Content";
import { useAppSelector } from "@/store/useClient";
import { DropDown } from "@/components/global/DropDown";

export default function EditGroup() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const cardioGroupings = useAppSelector(
    (state) => state.appState.cardioGroupings
  );

  let content = [];

  for (let i = 0; i < cardioGroupings.length; i++) {
    const item = cardioGroupings[i];
    if (
      item.group_id !== exerciseData.group_id &&
      item.group_name !== exerciseData.group_name && //if there for some case is a duplicate
      (item.discipline === "all" || item.discipline !== exerciseData.discipline)
    ) {
      content.push({ title: item.group_name, id: item.group_id });
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
      <p className="w-32">Group:</p>
      <DropDown
        spellCheck={false}
        maxCharacters={20}
        focusNextElementOnEnter
        onUpdate={(e) => onGroupChange(e)}
        styling={{
          main: "z-20 w-full border-inactive bg-first text-first placeholder-[var(--text-second)]",
        }}
        placeholder={exerciseData.group_name}
        dropDownItems={content}
      />
    </>
  );
}
