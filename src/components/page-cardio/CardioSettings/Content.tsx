"use client";

import { EditName, EditGroup, EditIsSprint, EditUnit } from ".";
import { useState } from "react";
import { createContext } from "react";
import { twJoin } from "tailwind-merge";

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
        <EditIsSprint />
      </div>
      <div
        className={twJoin(
          "grid gap-y-4 tn:grid-cols-[calc(60%_-_4px)_calc(40%_-_4px)] tn:gap-x-2",
          "vsm:grid-cols-[calc(60%_-_8px)_calc(40%_-_8px)] vsm:gap-x-4",
          "h-full w-full max-w-2xl items-center justify-center"
        )}
      >
        <div className="flex w-full flex-col items-center gap-y-2 text-center">
          <EditGroup />
        </div>
        <div className="flex w-full flex-col items-center gap-y-2 text-center">
          <EditUnit />
        </div>
      </div>
    </SettingsContext.Provider>
  );
}
