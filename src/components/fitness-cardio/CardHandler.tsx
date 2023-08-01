"use client";

import { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";
import { clamp } from "@/lib/util/functions";
import Image from "next/image";
import { deleteIcon } from "@/assets/images";

export default function CardHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const startPos = useRef(0);
  const hasStartedSwipe = useRef(false);
  const offsetX = useRef(0);
  const transition = useRef("");
  const [translateX, setTranslateX] = useState(-100);
  const swipeStart = 25;
  const maxSwipe = 100;

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener("touchstart", (e) => {
        transition.current = "";
        startPos.current = e.changedTouches[0].pageX;
      });
      cardRef.current.addEventListener("touchmove", (e) => {
        const newX = e.changedTouches[0].pageX - startPos.current;
        if (cardRef.current) {
          if (
            (newX > swipeStart || newX < -swipeStart) &&
            hasStartedSwipe.current === false
          ) {
            hasStartedSwipe.current = true;
            let offset = newX > 0 ? swipeStart : -swipeStart;
            offsetX.current = offset;
            setTranslateX(
              e.changedTouches[0].pageX - startPos.current - offset
            );
          } else if (hasStartedSwipe.current) {
            const newX = clamp(
              -maxSwipe,
              e.changedTouches[0].pageX - startPos.current - offsetX.current,
              maxSwipe
            );
            setTranslateX(newX);
          }
        }
      });
      cardRef.current.addEventListener("touchend", () => {
        hasStartedSwipe.current = false;
        transition.current = "transition-all duration-300";
        setTranslateX(0);
      });
    }
  }, []);

  const hi = 1 / translateX;
  console.log(hi, translateX);

  return (
    <>
      <div className="relative flex h-full w-full">
        <div
          ref={cardRef}
          style={{ transform: `translateX(${translateX}px)` }}
          className={twJoin(transition.current, "w-full")}
        >
          {children}
        </div>

        <div
          className={twJoin(
            transition.current,
            `absolute -right-4 grid h-full place-items-center bg-red-500`
          )}
          style={{
            transform: `scaleX(${Math.min(translateX, 0)})`,
            width: "2px",
            opacity: Math.abs(translateX / maxSwipe),
          }}
        >
          {/* <div
            className="absolute left-0 aspect-square h-8 w-8 bg-green-700"
            style={{ transform: `scaleX(${hi})` }}
          >
            <Image
              src={deleteIcon}
              alt="del"
              className={twJoin(transition.current, "h-full w-full")}
              style={{
                opacity: Math.abs(translateX / maxSwipe) - 0.1,
              }}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
