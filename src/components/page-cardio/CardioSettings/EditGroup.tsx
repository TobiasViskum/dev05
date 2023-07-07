"use client";

import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "./Content";
import { useAppSelector } from "@/store/useClient";
import { DropDown } from "@/components/global/DropDown";

export default function EditGroup() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const cardioGroupings = useAppSelector(
    (state) => state.appState.cardioGroupings
  );
  const [items, setItems] = useState(generateItems(exerciseData.group_name));

  function generateItems(groupName: string) {
    let content = [];

    for (let i = 0; i < cardioGroupings.length; i++) {
      const item = cardioGroupings[i];

      content.push({ title: item.group_name, id: item.group_id });
    }
    return content;
  }

  function onGroupChange(title: string) {
    if (title !== "") {
      setItems(generateItems(title));
    }

    context.handleGroupInput(title);
  }

  const generateItems2 = generateItems;

  useEffect(() => {
    function handleRefresh(
      e: CustomEvent<{ newName: string; newGroup: string; newUnit: string }>
    ) {
      const newGroup = e.detail.newGroup;

      setItems(generateItems2(newGroup));
    }

    document.addEventListener("refreshSettingsPage", handleRefresh as any);
    return () =>
      document.removeEventListener("refreshSettingsPage", handleRefresh as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p className="w-32">Group:</p>
      <DropDown
        spellCheck={false}
        maxCharacters={20}
        onUpdate={(e) => onGroupChange(e)}
        styling={{
          main: "z-20 w-full border-inactive bg-first text-first placeholder-[var(--text-second)]",
        }}
        placeholder={exerciseData.group_name}
        dropDownItems={items}
      />
    </>
  );
}
