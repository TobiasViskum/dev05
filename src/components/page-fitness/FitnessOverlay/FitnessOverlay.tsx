"use client";

interface Props {
  profileData: ProfileData;
  type: "reps" | "max";
}
import { useRef, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import { EditAmount, CreateExercise } from "./Content";
import { LoadingSpinner, Checkmark } from "@/components/global";

export default function FitnessOverlay() {
  const [isActive, setIsActive] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<Overlay>("");
  const exerciseData = useRef<FitnessData | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("showFitnessOverlay", ((
      e: CustomEvent<{
        overlay: Overlay;
        exerciseData?: FitnessData;
      }>
    ) => {
      exerciseData.current = e.detail.exerciseData
        ? e.detail.exerciseData
        : null;
      setIsActive(true);
      setActiveOverlay(e.detail.overlay);
    }) as EventListener);
  }, []);

  function closeOverlay() {
    setIsActive(false);
    setTimeout(() => {
      setActiveOverlay("");
    }, 150);
  }
  function changeActiveOverlay(newOverlay: Overlay) {
    setActiveOverlay(newOverlay);
    if (newOverlay === "animation") {
      setTimeout(() => {
        closeOverlay();
      }, 1250);
    }
  }
  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (mainRef.current && e) {
      const dimensions = mainRef.current.getBoundingClientRect();
      if (
        e.clientX < dimensions.left ||
        e.clientX > dimensions.right ||
        e.clientY < dimensions.top ||
        e.clientY > dimensions.bottom
      ) {
        if (activeOverlay !== "loading" && activeOverlay !== "animation") {
          closeOverlay();
        }
      }
    }
  }

  return (
    <>
      <div
        onClick={(e) => handleClose(e)}
        className={twJoin(
          "fixed left-0 top-0 z-30 grid h-full w-full place-items-center",
          isActive
            ? "visible opacity-100 [transition:_opacity_300ms,_visibility_0ms]"
            : "invisible opacity-0 [transition:_opacity_300ms,_visibility_0ms_300ms]"
        )}
      >
        <div
          className={twJoin(
            "fixed h-full w-full bg-black transition-opacity",
            isActive ? "opacity-75" : "opacity-0"
          )}
        />
        <div
          ref={mainRef}
          className={twJoin(
            "z-10 grid min-w-small max-w-small place-items-center rounded text-first",
            activeOverlay === "animation"
              ? ""
              : activeOverlay === "loading"
              ? ""
              : "bg-first shadow-[0_0_0_0.3rem_rgba(var(--bg-second-preset),_0.75)]"
          )}
        >
          {activeOverlay === "loading" || activeOverlay === "animation" ? (
            <>
              <LoadingSpinner
                opacity={
                  activeOverlay === "animation" ? "opacity-0" : "opacity-100"
                }
              />
              {activeOverlay === "animation" && <Checkmark />}
            </>
          ) : activeOverlay === "editAmount" ? (
            <EditAmount
              exerciseData={exerciseData.current}
              closeOverlay={closeOverlay}
              changeActiveOverlay={changeActiveOverlay}
            />
          ) : activeOverlay === "createExercise" ? (
            <CreateExercise />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
