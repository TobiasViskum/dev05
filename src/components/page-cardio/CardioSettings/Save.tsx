"use client";

import { useAppSelector } from "@/store/useClient";
import { SettingsContext } from "./Content";
import { useContext, useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import Image from "next/image";
import { save } from "@/assets/images";
import { Button } from "@/components/global/Button";
import { useRouter } from "next/navigation";

export default function Save() {
  const router = useRouter();
  const [isSaveVisible, setIsSaveVisible] = useState(false);
  const profileData = useAppSelector((state) => state.userData.profileData);
  const exerciseData = useAppSelector((state) => state.appState.cardioExercise);
  const context = useContext(SettingsContext);
  const values = context.values;

  useEffect(() => {
    function checkIfChanged() {
      if (exerciseData.name !== values.newName && values.newName !== "")
        return true;
      if (exerciseData.group_name !== values.newGroup && values.newGroup !== "")
        return true;
      if (exerciseData.unit_name !== values.newUnit && values.newUnit !== "")
        return true;
      return false;
    }

    const hasChanged = checkIfChanged();
    if (hasChanged) {
      setIsSaveVisible(hasChanged);
    } else if (hasChanged === false) {
      setIsSaveVisible(false);
    }
  }, [values, exerciseData]);

  async function handleSave() {
    const event1 = new CustomEvent("showCardioOverlay", {
      detail: { overlay: "loading" },
    });
    document.dispatchEvent(event1);

    const newName = values.newName === "" ? exerciseData.name : values.newName;
    const newGroup =
      values.newGroup === "" ? exerciseData.group_name : values.newGroup;
    const newUnit =
      values.newUnit === "" ? exerciseData.unit_name : values.newUnit;

    await fetch("/api/cardio/update-settings", {
      method: "POST",
      body: JSON.stringify({
        id: exerciseData.id,
        profileGroupUid: profileData.group_uid,
        disciplineId: exerciseData.discipline_id,
        newName: newName,
        newGroup: newGroup,
        newUnit: newUnit,
      }),
    });
    router.refresh();

    setTimeout(() => {
      const event2 = new CustomEvent("showCardioOverlay", {
        detail: { overlay: "animation" },
      });
      document.dispatchEvent(event2);

      setTimeout(() => {
        const event3 = new CustomEvent("showCardioOverlay", {
          detail: { overlay: "" },
        });
        document.dispatchEvent(event3);
        const event4 = new CustomEvent("refreshSettingsPage", {
          detail: { newName: newName, newGroup: newGroup, newUnit: newUnit },
        });
        document.dispatchEvent(event4);
      }, 1500);
    }, 1000);
  }

  return (
    <>
      <Button
        onClick={handleSave}
        styling={{
          main: twJoin(
            "absolute right-4 grid h-12 w-12 rounded-lg place-items-center bg-news shadow-circle-xl transition-opacity standalone:touch:bottom-24 border-none",
            isSaveVisible ? "opacity-100" : "opacity-0"
          ),
        }}
      >
        <Image src={save} alt="save" height={32} width={32} />
      </Button>
    </>
  );
}
