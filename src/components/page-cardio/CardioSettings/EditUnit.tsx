"use client";

import { useContext, useState } from "react";
import { SettingsContext } from "./Content";
import { useAppSelector } from "@/store/useClient";
import { DropDown } from "@/components/global/DropDown";

export default function EditUnit() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const cardioGroupings = useAppSelector((state) => state.appState.cardioUnits);

  const [items, setItems] = useState(generateItems(exerciseData.unit_name));

  function generateItems(unitName: string) {
    let content = [];

    for (let i = 0; i < cardioGroupings.length; i++) {
      const item = cardioGroupings[i];

      if (item.unit_name !== unitName) {
        content.push({ title: item.unit_name, id: item.unit_id });
      }
    }
    return content;
  }

  function onUnitChange(title: string) {
    if (title !== "") {
      setItems(generateItems(title));
    }
    context.handleUnitInput(title);
  }

  return (
    <>
      <p className="w-32">Unit:</p>
      <DropDown
        allowDanishCharacters
        onlyLetters
        maxCharacters={4}
        disableCreate
        spellCheck={false}
        focusNextInputOnEnter
        onUpdate={(e) => onUnitChange(e)}
        styling={{
          main: "z-10 w-full border-inactive bg-first text-first placeholder-[var(--text-second)]",
        }}
        placeholder={exerciseData.unit_name}
        dropDownItems={items}
      />
    </>
  );
}
