"use client";

import { useAppSelector } from "@/store/useClient";
import { useState } from "react";
import { createContext } from "react";

interface InitialValue {
  handleNameInput: (newInput: string) => void;
  handleGroupInput: (newInput: string) => void;
  handleUnitInput: (newInput: string) => void;
  values: {
    newName: string;
    newGroup: string;
    newUnit: string;
  };
}

const initialValue: InitialValue = {
  handleNameInput: () => {},
  handleGroupInput: () => {},
  handleUnitInput: () => {},
  values: { newName: "", newGroup: "", newUnit: "" },
};
export const SettingsContext = createContext(initialValue);

export default function Content({ children }: { children: React.ReactNode }) {
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);

  const [nameInput, setNameInput] = useState(exerciseData.name);
  const [groupInput, setGroupInput] = useState(exerciseData.group_name);
  const [unitInput, setUnitInput] = useState(exerciseData.unit_name);

  function handleNameInput(newInput: string) {
    setNameInput(newInput);
  }
  function handleGroupInput(newInput: string) {
    setGroupInput(newInput);
  }
  function handleUnitInput(newInput: string) {
    setUnitInput(newInput);
  }

  return (
    <SettingsContext.Provider
      value={{
        handleNameInput: handleNameInput,
        handleGroupInput: handleGroupInput,
        handleUnitInput: handleUnitInput,
        values: {
          newName: nameInput,
          newGroup: groupInput,
          newUnit: unitInput,
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
