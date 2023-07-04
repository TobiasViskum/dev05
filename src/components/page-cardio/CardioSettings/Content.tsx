"use client";

import { EditName, EditGroup, EditIsSprint } from ".";
import { useState } from "react";
import { createContext } from "react";

interface InitialValue {
  handleNameInput: (newInput: string) => void;
  handleGroupInput: (newInput: string) => void;
}

const initialValue: InitialValue = {
  handleNameInput: () => {},
  handleGroupInput: () => {},
};
export const SettingsContext = createContext(initialValue);

export default function Content() {
  const [nameInput, setNameInput] = useState("");
  const [groupInput, setGroupInput] = useState("");

  function handleNameInput(newInput: string) {
    setNameInput(newInput);
  }
  function handleGroupInput(newInput: string) {
    setGroupInput(newInput);
  }

  return (
    <SettingsContext.Provider
      value={{
        handleNameInput: handleNameInput,
        handleGroupInput: handleGroupInput,
      }}
    >
      <div className="flex w-full max-w-2xl items-center justify-center">
        <EditName />
      </div>
      <div className="flex w-full max-w-2xl items-center justify-center">
        <EditGroup />
      </div>
      <div className="flex w-full max-w-2xl items-center justify-center">
        <EditIsSprint />
      </div>
    </SettingsContext.Provider>
  );
}
