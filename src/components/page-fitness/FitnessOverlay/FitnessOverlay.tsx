"use client";

import { useRef, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import { EditAmount, CreateExercise } from "./Content";
import { LoadingSpinner, Checkmark } from "@/components/global";
import { Dialog } from "@/components/global/Dialog";

export default function FitnessOverlay() {
  const [isClosed, setIsClosed] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<Overlay>("");
  const [isClosable, setIsClosable] = useState(true);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    document.addEventListener("showFitnessOverlay", ((
      e: CustomEvent<{
        overlay: Overlay;
      }>
    ) => {
      setIsClosed(false);
      if (dialogRef.current?.open === false) {
        dialogRef.current?.showModal();
      }
      setActiveOverlay(e.detail.overlay);

      if (e.detail.overlay === "") {
        closeOverlay();
      }
    }) as EventListener);
  }, []);

  function closeOverlay() {
    setIsClosed(true);
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

  useEffect(() => {
    if (activeOverlay === "loading" || activeOverlay === "animation") {
      setIsClosable(false);
    } else {
      setIsClosable(true);
    }
  }, [activeOverlay]);

  return (
    <>
      <Dialog
        closable={isClosable}
        closed={isClosed}
        className={twJoin(
          "rounded-md",
          activeOverlay === "loading"
            ? "bg-transparent shadow-none"
            : activeOverlay === "animation"
            ? "bg-transparent shadow-none"
            : "bg-first shadow-[0_0_0_0.3rem_rgba(var(--bg-second-preset),_0.75)]"
        )}
        ref={dialogRef}
      >
        {activeOverlay === "loading" || activeOverlay === "animation" ? (
          <>
            <LoadingSpinner opacity={activeOverlay === "animation" ? "opacity-0" : "opacity-100"} />
            {activeOverlay === "animation" && <Checkmark />}
          </>
        ) : activeOverlay === "editAmount" ? (
          <EditAmount closeOverlay={closeOverlay} changeActiveOverlay={changeActiveOverlay} />
        ) : activeOverlay === "createExercise" ? (
          <CreateExercise closeOverlay={closeOverlay} changeActiveOverlay={changeActiveOverlay} />
        ) : (
          <></>
        )}
      </Dialog>
      {/* <div
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
              closeOverlay={closeOverlay}
              changeActiveOverlay={changeActiveOverlay}
            />
          ) : activeOverlay === "createExercise" ? (
            <CreateExercise />
          ) : (
            <></>
          )}
        </div>
      </div> */}
    </>
  );
}
