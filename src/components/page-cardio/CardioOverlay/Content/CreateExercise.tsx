import { useAppSelector } from "@/store/useClient";
import { usePathname, useParams, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { firstLetterUppercase } from "@/lib/util";
import { twJoin } from "tailwind-merge";
import { CardioOverlayContext } from "../CardioOverlay";
import { useAppDispatch } from "@/store/useClient";
import { setCardioData } from "@/store/userDataSlice";

export default function CreateExercise() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const context = useContext(CardioOverlayContext);
  const path = usePathname();
  const discipline = path.split("/").slice(-1)[0];
  const uid = useParams().uid;

  const cardioData = useAppSelector((state) => state.userData.cardioData);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function getPlaceholderText() {
    const filteredData = cardioData.filter(
      (item) => item.discipline_name.toLowerCase() === discipline.toLowerCase()
    );
    return `Exercise #${filteredData.length + 1}`;
  }

  async function handleSaveClick() {
    const name = inputValue === "" ? getPlaceholderText() : inputValue;
    context.changeActiveOverlay("loading");
    await fetch("/api/cardio/create-exercise", {
      method: "POST",
      body: JSON.stringify({
        uid: uid,
        name: name,
        discipline: discipline,
      }),
    });
    const response = await fetch(
      `/api/redux-store?uid=${uid}&getSpecific=cardioData`
    );
    const result: { cardioData: CardioData[] } = await response.json();
    dispatch(setCardioData(result.cardioData));

    setTimeout(() => {
      router.refresh();
      context.changeActiveOverlay("animation");
    }, 200);
  }

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
          <div className="flex flex-col items-center gap-y-2">
            <p className="text-sm text-second">Name:</p>
            <input
              spellCheck={false}
              onChange={(e) => handleInputChange(e)}
              value={inputValue}
              placeholder={getPlaceholderText()}
              className={twJoin(
                "w-full rounded-md border border-solid border-inactive bg-first py-0.5 text-center text-sm text-first placeholder-[var(--text-second)] outline-none"
              )}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                inputValue === ""
                  ? (e.target.placeholder = getPlaceholderText())
                  : ""
              }
            />
          </div>
        </div>
        <button
          className="mb-4 mt-2 w-2/5 rounded-lg bg-news shadow-circle-lg shadow-white"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </>
  );
}
