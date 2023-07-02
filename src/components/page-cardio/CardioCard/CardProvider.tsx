"use client";

import { createContext } from "react";

const initialState: { exerciseData: CardioData } = {
  exerciseData: {} as CardioData,
};

export const CardContext = createContext(initialState);

export default function CardProvider({
  exerciseData,
  children,
}: {
  exerciseData: CardioData;
  children: React.ReactNode;
}) {
  return (
    <>
      <CardContext.Provider value={{ exerciseData: exerciseData }}>
        {children}
      </CardContext.Provider>
    </>
  );
}
