import { useAppSelector } from "@/store/useClient";
import { usePathname } from "next/navigation";
import styles from "./CreateExercise.module.scss";
import { useRef } from "react";

export default function CreateExercise() {
  const path = usePathname();
  const profileData = useAppSelector((state) => state.userData.profileData);
  const maxRef = useRef<HTMLInputElement | null>(null);
  const repsRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="flex flex-col items-center gap-y-3">
        <div className="text-center">
          <p className="text-second">NEW</p>
          <h3 className="text-lg font-semibold">Fitness Exercise</h3>
        </div>
        <div className="grid gap-y-3">
          <div className="flex justify-between gap-x-4">
            <p>Max</p>
            <input ref={maxRef} type="checkbox" className={styles.input} />
          </div>
          <div className="flex justify-between gap-x-4">
            <p>Reps</p>
            <input ref={repsRef} type="checkbox" className={styles.input} />
          </div>
        </div>
      </div>
    </>
  );
}
