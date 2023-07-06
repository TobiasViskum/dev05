"use client";

import { Button } from "@/components/global/Button";
import { Input } from "@/components/global/Input";
import { useAppDispatch, useAppSelector } from "@/store/useClient";
import { useState, useContext } from "react";
import { CardioOverlayContext } from "../CardioOverlay";
import { setCardioData } from "@/store/userDataSlice";
import { useRouter, useSearchParams } from "next/navigation";

export default function DeleteExercise() {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const matcher = searchParams.get("matcher");
  const router = useRouter();
  const context = useContext(CardioOverlayContext);
  const profileData = useAppSelector((state) => state.userData.profileData);
  const cardioData = useAppSelector((state) => state.appState.cardioExercise);

  async function handleClick() {
    if (input === profileData.password) {
      context.changeActiveOverlay("loading");
      await fetch("/api/cardio/delete-exercise", {
        method: "POST",
        body: JSON.stringify({
          id: cardioData.id,
          uid: profileData.uid,
        }),
      });
      router.replace(
        `/${profileData.uid}/cardio${matcher ? ["/", matcher].join("") : ""}`
      );
      const response = await fetch(
        `/api/redux-store?uid=${profileData.uid}&getSpecific=cardioData`
      );
      const result: { cardioData: CardioData[] } = await response.json();
      dispatch(setCardioData(result.cardioData));

      setTimeout(() => {
        router.refresh();
        context.changeActiveOverlay("animation");
      }, 200);
    }
  }

  return (
    <>
      <div className="mx-10 flex flex-col items-center gap-y-2">
        <div className="text-center">
          <p className="mt-2 text-second">DELETE EXERCISE</p>
          <h3 className="text-lg font-semibold">Confirmation</h3>
        </div>
        <div className="grid gap-y-2">
          <form>
            <fieldset className="w-full rounded-md border-2 border-solid border-inactive bg-first">
              <legend className="ml-2 mr-auto px-1 text-base font-bold leading-none text-second">
                Password
              </legend>
              <Input
                applyAutocompleteStyling
                type="password"
                name="password"
                spellCheck={false}
                placeholder={""}
                styling={{
                  main: "w-full border-none bg-first py-0 pb-2 text-sm text-first placeholder-[var(--text-second)] focus:outline-0",
                }}
                maxCharacters={45}
                onChange={(e) => setInput(e.target.value)}
              />
            </fieldset>
          </form>
        </div>
        <Button
          insideModal
          styling={{
            main: "mb-4 mt-3 w-1/2 rounded-lg text-sm py-1 bg-[rgba(var(--text-active-preset),_1)] border-none transition-colors",
            disabled:
              "bg-[rgba(var(--text-active-preset),_0.3)] text-second focus:outline-0",
          }}
          disabled={input === profileData.password ? false : true}
          onClick={handleClick}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
