"use client";

import { useContext } from "react";
import { SettingsContext } from "./Content";
import { useAppSelector } from "@/store/useClient";
import { DropDown } from "@/components/global/DropDown";

export default function EditGroup() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector(
    (state) => state.exerciseState.cardioExercise
  );

  const content = [
    { title: "Title", description: "", id: 1 },
    { title: "Title", description: "", id: 2 },
    { title: "Title", description: "", id: 3 },
    { title: "Title", description: "", id: 4 },
    { title: "Title", description: "", id: 5 },
  ];

  return (
    <>
      <p className="w-32">Group:</p>
      <DropDown
        spellCheck={false}
        focusNextElementOnEnter
        onItemClick={(e) => console.log(e)}
        className="w-full border-inactive bg-first text-first placeholder-[var(--text-second)]"
        placeholder={exerciseData.group_name}
        dropDownItems={content}
      />
    </>
  );
}
