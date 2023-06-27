import { useState, useRef, useEffect } from "react";
import DateNodes from "./DateNodes";
import { getFutureDate } from "./functions";
import { StylingProps } from "./types";

export default function DateNodesContent({
  currDate,
  currAction,
  dateNodeClass,
  styling,
  activeDateNode,
  setActiveDateNode,
  dateNodeActiveClass,
  onDateChange,
}: {
  currDate: { year: number; month: number };
  currAction: "forwards" | "backwards" | "";
  dateNodeClass: string;
  styling: StylingProps | undefined;
  activeDateNode: Date | null;
  setActiveDateNode: React.Dispatch<React.SetStateAction<Date | null>>;
  dateNodeActiveClass: string;
  onDateChange: ((e: Date) => void) | undefined;
}) {
  const [translateMove, setTranslateMove] = useState(0);

  const dateNodesHolderRef = useRef<HTMLDivElement | null>(null);

  const transitionTransform = useRef<string>("transition-transform");

  function getTranslateX(newX: number) {
    return [newX.toString(), "%"].join("");
  }

  useEffect(() => {
    dateNodesHolderRef.current?.addEventListener(
      "transitionend",
      (e) => {
        transitionTransform.current = "";
        setTranslateMove(0);
      },
      {
        once: true,
      }
    );
    if (currAction === "backwards") {
      setTranslateMove((prev) => prev + 110);
    } else if (currAction === "forwards") {
      setTranslateMove((prev) => prev - 110);
    }
  }, [currDate, currAction]);

  useEffect(() => {
    transitionTransform.current = "transition-transform";
    console.log();
  }, [translateMove]);

  const content = useRef<JSX.Element[]>([
    <div
      key={0}
      className="absolute grid gap-y-2"
      style={{ transform: `translateX(-110%)` }}
    >
      <DateNodes
        props={{
          activeDateNode: activeDateNode,
          dateNodeActiveClass: dateNodeActiveClass,
          dateNodeClass: dateNodeClass,
          month: getFutureDate("month", "backwards", currDate),
          onDateChange: onDateChange,
          setActiveDateNode: setActiveDateNode,
          styling: styling,
          year: getFutureDate("year", "backwards", currDate),
        }}
      />
    </div>,
    <div
      key={1}
      className="absolute grid gap-y-2"
      style={{ transform: `translateX(0%)` }}
    >
      <DateNodes
        props={{
          activeDateNode: activeDateNode,
          dateNodeActiveClass: dateNodeActiveClass,
          dateNodeClass: dateNodeClass,
          month: currDate.month,
          onDateChange: onDateChange,
          setActiveDateNode: setActiveDateNode,
          styling: styling,
          year: currDate.year,
        }}
      />
    </div>,
    <div
      key={2}
      className="absolute grid gap-y-2"
      style={{ transform: `translateX(110%)` }}
    >
      <DateNodes
        props={{
          activeDateNode: activeDateNode,
          dateNodeActiveClass: dateNodeActiveClass,
          dateNodeClass: dateNodeClass,
          month: getFutureDate("month", "forwards", currDate),
          onDateChange: onDateChange,
          setActiveDateNode: setActiveDateNode,
          styling: styling,
          year: getFutureDate("year", "forwards", currDate),
        }}
      />
    </div>,
  ]);

  return (
    <>
      <div
        className={`grid grid-flow-col ${transitionTransform.current}`}
        style={{
          transform: `translateX(${getTranslateX(translateMove)})`,
        }}
        ref={dateNodesHolderRef}
      >
        {content.current}
      </div>
    </>
  );
}
