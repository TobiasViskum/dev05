import { twJoin } from "tailwind-merge";
import { isTheme } from "@/lib/util/themes";
import Image from "next/image";
import {
  graph,
  settingsFull,
  locked,
  unlocked,
  deleteIcon,
} from "@/assets/images";
import { useState } from "react";

interface Props {
  profileData: ProfileData;
  exerciseData: FitnessData;
}

export default function Buttons({ profileData, exerciseData }: Props) {
  const [isLocked, setIsLocked] = useState(exerciseData.is_date_locked);
  const [canFetch, setCanFetch] = useState(true);

  async function handleLockClick() {
    if (canFetch) {
      setCanFetch(false);
      setIsLocked(isLocked === 1 ? 0 : 1);
      await fetch("/api/fitness/update-lock", {
        method: "POST",
        body: JSON.stringify({
          id: exerciseData.id,
          newState: isLocked === 1 ? 0 : 1,
        }),
      });
      setCanFetch(true);
    }
  }

  return (
    <>
      <button
        className={twJoin(
          "grid h-8 w-8 place-items-center rounded-full shadow-br-md transition-transform can-hover:hover:scale-110",
          isTheme("blue", profileData)
            ? "[background:_var(--bg-third)]"
            : "bg-second"
        )}
      >
        <Image src={graph} alt="graph" className="h-3/5 w-3/5" />
      </button>
      <button
        className={twJoin(
          "grid h-8 w-8 place-items-center rounded-full shadow-br-md transition-transform can-hover:hover:scale-110",
          isTheme("blue", profileData)
            ? "[background:_var(--bg-third)]"
            : "bg-second"
        )}
      >
        <Image src={settingsFull} alt="settings" className="h-3/5 w-3/5" />
      </button>
      <button
        onClick={handleLockClick}
        className={twJoin(
          "grid h-8 w-8 place-items-center rounded-full shadow-br-md transition-transform can-hover:hover:scale-110",
          isTheme("blue", profileData)
            ? "[background:_var(--bg-third)]"
            : "bg-second"
        )}
      >
        <Image
          src={isLocked ? locked : unlocked}
          alt="lock"
          className="h-7/12 w-7/12"
        />
      </button>
      <button
        className={twJoin(
          "ml-auto mr-4 grid h-8 w-8 place-items-center rounded-full shadow-br-md transition-all can-hover:hover:scale-110",
          isTheme("blue", profileData)
            ? "[background:_var(--bg-third)]"
            : "bg-second",
          isLocked ? "opacity-25" : "opacity-100"
        )}
      >
        <Image src={deleteIcon} alt="delete" className="h-7/12 w-7/12" />
      </button>
    </>
  );
}
