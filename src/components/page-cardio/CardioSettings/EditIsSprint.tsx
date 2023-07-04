"use client";
import { useAppSelector } from "@/store/useClient";
import { useContext } from "react";
import { SettingsContext } from "./Content";

export default function EditIsSprint() {
  const context = useContext(SettingsContext);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);

  return (
    <>
      <p className="w-96">Is Average speed first:</p>
      <div className="w-full">HEj</div>
    </>
  );
}
