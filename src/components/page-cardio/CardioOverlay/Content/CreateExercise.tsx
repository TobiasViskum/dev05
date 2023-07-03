import { useAppSelector } from "@/store/useClient";
import { usePathname } from "next/navigation";
import styles from "./CreateExercise.module.scss";
import { useRef } from "react";
import { firstLetterUppercase } from "@/lib/util";

export default function CreateExercise() {
  const path = usePathname();
  const discipline = path.split("/").slice(-1)[0];

  const profileData = useAppSelector((state) => state.userData.profileData);
  const maxRef = useRef<HTMLInputElement | null>(null);
  const repsRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="mx-10 flex flex-col items-center gap-y-2">
        <div className="text-center">
          <p className="text-second">NEW</p>
          <h3 className="text-lg font-semibold">
            {firstLetterUppercase(discipline)} Exercise
          </h3>
        </div>
        <div className="grid gap-y-2">
          <div>
            <p className="text-sm text-second">Distance:</p>
            <input />
          </div>
        </div>
      </div>
    </>
  );
}
