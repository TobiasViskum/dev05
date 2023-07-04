"use client";

import { useRef, useEffect, useState, createContext } from "react";
import { twJoin } from "tailwind-merge";
import { EditAmount, CreateExercise } from "./Content";
import { LoadingSpinner, Checkmark } from "@/components/global";
import { Dialog } from "@/components/global/Dialog";
import { v4 as uuidv4 } from "uuid";

const initialValue: {
  closeOverlay: () => void;
  changeActiveOverlay: (newOverlay: Overlay) => void;
  activeOverlay: Overlay;
  uniqueOpenUid: string;
} = {
  closeOverlay: () => {},
  changeActiveOverlay: () => {},
  activeOverlay: "",
  uniqueOpenUid: uuidv4(),
};

export const CardioOverlayContext = createContext(initialValue);

export default function CardioOverlay() {
  const [isClosed, setIsClosed] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<Overlay>("");
  const [isClosable, setIsClosable] = useState(true);
  const [uniqueOpenUid, setUniqueOpenUid] = useState(uuidv4());
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    document.addEventListener("showCardioOverlay", ((
      e: CustomEvent<{
        overlay: Overlay;
      }>
    ) => {
      setUniqueOpenUid(uuidv4());
      setIsClosed(false);
      if (dialogRef.current?.open === false) {
        dialogRef.current?.showModal();
      }
      setActiveOverlay(e.detail.overlay);
    }) as EventListener);

    // document.addEventListener("close", (e) => {
    //   console.log(e.target);
    //   if (e.target === dialogRef.current) {
    //     console.log("sdf");

    //     setUniqueOpenUid(uuidv4());
    //   }
    // });
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
    <CardioOverlayContext.Provider
      value={{
        changeActiveOverlay: changeActiveOverlay,
        closeOverlay: closeOverlay,
        activeOverlay: activeOverlay,
        uniqueOpenUid: uniqueOpenUid,
      }}
    >
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
            <LoadingSpinner />
            {activeOverlay === "animation" && <Checkmark />}
          </>
        ) : activeOverlay === "editAmount" ? (
          <EditAmount />
        ) : activeOverlay === "createExercise" ? (
          <CreateExercise />
        ) : (
          <></>
        )}
      </Dialog>
    </CardioOverlayContext.Provider>
  );
}
